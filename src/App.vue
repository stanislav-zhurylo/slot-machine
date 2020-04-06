<template>
    <div>
        <div class="row">
            <div class="col-sm-6 col-xs-6 col-md-6">
                <div class="machine-area pull-right">
                    <machine></machine>
                    <div class="debug-switch-area">
                        <input id="debugMode"
                               name="debugMode"
                               type="checkbox"
                               :value="isDebugModeEnabled"
                               @change="switchDebugModeEnabled($event)">
                        <label class="debug-switch-label" for="debugMode"> Debug mode</label><br>
                    </div>
                    <div class="machine-control-area">
                        <notification message="Click the reel to freeze it"/>
                        <notification v-if="isDebugModeEnabled" message="Use browser's console to see debug output"/>
                        <notification v-if="creditsValue === 0" message="You have no credits to continue"/>
                        <form class="form-inline">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">€</div>
                                    <input :min="1"
                                           :max="5000"
                                           type="number"
                                           v-model="depositInputValue"
                                           class="form-control">
                                </div>
                            </div>
                            <button type="submit"
                                    class="btn btn-success"
                                    @click="requestDepositAmount($event)"
                                    :disabled="depositInputValue === '0'">
                                Deposit amount
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-md-6">
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                        </div>
                        <div class="legend-item-title">€ 2000 (top line)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                        </div>
                        <div class="legend-item-title">€ 1000 (top center)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                        </div>
                        <div class="legend-item-title">€ 4000 (bottom line)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/7.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/7.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/7.png'"/>
                        </div>
                        <div class="legend-item-title">€ 150 (any line)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/CHERRY.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/7.png'"/>
                        </div>
                        <div class="legend-item-title">€ 75 (any line)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/3xBAR.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/3xBAR.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/3xBAR.png'"/>
                        </div>
                        <div class="legend-item-title">€ 50 (any line)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/2xBAR.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/2xBAR.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/2xBAR.png'"/>
                        </div>
                        <div class="legend-item-title">€ 20 (any line)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/BAR.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/BAR.png'"/>
                            <img alt="" class="legend-item-image" :src="'./images/BAR.png'"/>
                        </div>
                        <div class="legend-item-title">€ 10 (any line)</div>
                    </div>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-item-images">
                            <img alt="" class="legend-item-image" :src="'./images/BAR.png'"/>
                        </div>
                        <div class="legend-item-title">€ 5 (any line)</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Action, Getter} from 'vuex-class'
    import {ACTION_TYPES} from './store/actions'
    import {GETTER_TYPES} from './store/getters'
    import {INSERT_COIN} from './constants/Sounds'
    import Machine from './components/Machine.vue'
    import {Component, Vue} from 'vue-property-decorator'
    import Notification from './components/Notification.vue'

    @Component({
        components: {
            Machine,
            Notification
        }
    })
    export default class App extends Vue {

        @Action(ACTION_TYPES.ACTION_DEPOSIT_AMOUNT)
        requestDepositAmountAction: (amount: number) => void;

        @Action(ACTION_TYPES.ACTION_SET_DEBUG_NODE_ENABLED)
        requestEnableDebugModeAction: (isDebugModeEnabled: boolean) => void;

        @Getter(GETTER_TYPES.GETTER_CREDIT_AMOUNT)
        creditsValue: number;

        @Getter(GETTER_TYPES.GETTER_IS_DEBUG_MODE_ENABLED)
        isDebugModeEnabled: boolean;

        depositInputValue: string = '5';

        switchDebugModeEnabled($event) {
            $event.preventDefault();
            this.requestEnableDebugModeAction(!this.isDebugModeEnabled);
            if (this.isDebugModeEnabled)
                console.debug('Debug mode has been requested');
        }

        requestDepositAmount($event): void {
            $event.preventDefault();
            this.requestDepositAmountAction(parseInt(this.depositInputValue));
            INSERT_COIN.play(0);
            if (this.isDebugModeEnabled)
                console.debug(`Deposit request ${parseInt(this.depositInputValue)}`);
        }
    }
</script>

<style lang="less" scoped>
    @import "./less/variables.less";
    @import "./less/mixins.less";

    .machine-control-area {
        margin-top: 16px;
    }

    .machine-area {
        margin-top: 16px;
    }

    .debug-switch-area {
        margin-top: 16px;
    }

    .debug-switch-label {
        font-size: @label-font-size-medium;
        font-weight: normal;
    }

    .legend {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
    }

    .legend-item {
        width: 100%;
        display: flex;
    }

    .legend-item-title {
        padding-top: 3px;
        color: gray(150);
        font-size: @label-font-size-xs;
    }

    .legend-item-images {
        min-width: 80px;
    }

    .legend-item-image {
        width: 20px;
    }

    .legend-tip {
        margin-top: 8px;
        font-size: 10px;
        color: gray(150);
    }

    .legend-credit {
        margin-top: 8px;
        font-size: 10px;
        font-style: italic;
        color: gray(150);
    }
</style>