<template>
    <div class="reel" v-bind:class="{'is-locked': isReelLocked(index)}" @click="invertReelLock()">
        <transition v-on:after-enter="afterEnterAnimation"
                    v-on:after-leave="afterLeaveAnimation"
                    v-on:enter="onEnterAnimation"
                    v-on:leave="onLeaveAnimation" appear>
            <div v-if="isAnimationFrameProcessing" class="wrapper">
                <img class="icon" :src="tiles[tilesMatrix[0]].imageLocation" alt=""/>
                <img class="icon" :src="tiles[tilesMatrix[1]].imageLocation" alt=""/>
                <img class="icon" :src="tiles[tilesMatrix[2]].imageLocation" alt=""/>
                <img class="icon" :src="tiles[tilesMatrix[3]].imageLocation" alt=""/>
                <img class="icon" :src="tiles[tilesMatrix[4]].imageLocation" alt=""/>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import Icon from '../model/Icon'
    import Velocity from 'velocity-animate'
    import {Action, Getter} from 'vuex-class'
    import {ACTION_TYPES} from '../store/actions'
    import {GETTER_TYPES} from '../store/getters'
    import {constant, flatten, shuffle, times} from 'lodash'
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {BAR, BARx2, BARx3, CHERRY, ICON7} from '../constants/Icons'
    import {LOCK} from "../constants/Sounds";

    @Component
    export default class Reel extends Vue {

        @Prop({required: true, default: 0}) index: number;

        @Prop({required: false, default: true}) canLock: boolean;

        @Prop({required: false, default: 3000}) animationPeriod: number;

        @Prop({required: true}) spinComplete: (
            reelIndex: number,
            combination: string[]
        ) => void;

        @Action(ACTION_TYPES.ACTION_INVERT_REEL_LOCK)
        requestInvertReelLockAction: (reelIndex: number) => void;

        @Action(ACTION_TYPES.ACTION_SET_REEL_ROTATING)
        setReelRotating: (data: { reelIndex: number, isRotating: boolean }) => void;

        @Getter(GETTER_TYPES.GETTER_IS_REEL_LOCKED)
        isReelLocked: (reelIndex: number) => boolean;

        @Getter(GETTER_TYPES.GETTER_IS_DEBUG_MODE_ENABLED)
        isDebugModeEnabled: boolean;

        animationMilliseconds: number = 0;

        isAnimationFrameLocked: boolean = false;

        isAnimationFrameProcessing: boolean = true;

        tilesMatrix: number[] = [0, 1, 2, 3, 4];

        indexDuringSpin: number = 2;

        tiles: Array<Icon>;

        beforeMount() {
            this.shuffleReelIcons();
        }

        mounted() {
            this.$parent.$on('requestSpin', this.requestSpin);
        }

        invertReelLock() {
            if(this.isDebugModeEnabled)
                console.debug(`Invert reel lock action requested, reel index ${this.index}`);
            this.requestInvertReelLockAction(this.index);
            LOCK.play(0);
        }

        requestSpin() {
            this.setReelRotating({reelIndex: this.index, isRotating: true});
            if (this.isReelLocked(this.index)) {
                this.setReelRotating({reelIndex: this.index, isRotating: false});
                this.spinComplete(
                    this.index, [
                        this.tiles[this.tilesMatrix[1]].code,
                        this.tiles[this.tilesMatrix[2]].code,
                        this.tiles[this.tilesMatrix[3]].code
                    ]
                );
                return;
            }
            this.shuffleReelIcons();
            this.isAnimationFrameLocked = true;
            this.isAnimationFrameProcessing = false;
            this.animationMilliseconds = (new Date()).getTime();
        }

        shuffleReelIcons() {
            this.tiles = shuffle(flatten([
                times(3, constant(BAR)),
                times(4, constant(BARx2)),
                times(5, constant(BARx3)),
                times(6, constant(ICON7)),
                times(7, constant(CHERRY))
            ]));
        }

        resetTileIndexes() {
            const end = this.tiles.length - 1;
            const index = this.indexDuringSpin === 0 ? end : this.indexDuringSpin - 1;
            this.indexDuringSpin = index;
            this.tilesMatrix = [
                index === 1 ? end : index === 0 ? end - 1 : index - 2,
                index === 0 ? end : index - 1,
                index,
                index === end ? 0 : index + 1,
                index === end - 1 ? 0 : index === end ? 1 : index + 2
            ];
        }

        onLeaveAnimation($element, completionHandler) {
            const currentMilliseconds = (new Date()).getTime();
            const timePassMilliseconds = this.animationMilliseconds + this.animationPeriod;
            if (currentMilliseconds > timePassMilliseconds) {
                this.isAnimationFrameLocked = false;
                this.isAnimationFrameProcessing = true;
                this.setReelRotating({reelIndex: this.index, isRotating: false});
                this.spinComplete(
                    this.index, [
                        this.tiles[this.tilesMatrix[1]].code,
                        this.tiles[this.tilesMatrix[2]].code,
                        this.tiles[this.tilesMatrix[3]].code
                    ]
                );
            } else {
                Velocity($element, {translateY: '90px'}, {duration: 75, easing: 'linear', complete: completionHandler});
            }
        }

        afterLeaveAnimation() {
            this.isAnimationFrameProcessing = true;
            this.resetTileIndexes();
        }

        onEnterAnimation($element, completionHandler) {
            Velocity($element, {translateY: '-90px'}, {duration: 0, easing: 'linear', complete: completionHandler});
        }

        afterEnterAnimation() {
            if (this.isAnimationFrameLocked) {
                this.isAnimationFrameProcessing = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    @iconSize: 90px;

    .reel {
        overflow: hidden;
        width: @iconSize;
        height: calc(@iconSize* 2.333);
    }

    .is-locked {
        background: rgba(0, 0, 0, 0.1);
    }

    .wrapper {
        display: flex;
        position: relative;
        flex-direction: column;
        top: calc(@iconSize * -1 * 1.333);
    }

    .icon {
        width: 90px;
    }
</style>