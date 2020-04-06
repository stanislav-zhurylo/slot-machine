<template>
    <div class="machine">
        <div class="reels">
            <div class="glass-shadow"></div>
            <div class="pay-line"></div>
            <reel :index="0"
                  :animation-period="2000"
                  :spin-complete="spinCompletionHandler"></reel>
            <reel :index="1"
                  :animation-period="2500"
                  :spin-complete="spinCompletionHandler"></reel>
            <reel :index="2"
                  :animation-period="3000"
                  :spin-complete="spinCompletionHandler"></reel>
        </div>
        <div class="balance-area">
            <balance-box :title="'Credits'"
                         :value-title="'€'"
                         :total-value-title="'Spend €'"
                         :has-alert="creditsValue === 0"
                         :value="creditsValue"
                         :total="spendTotalValue">
            </balance-box>
            <balance-box :title="'Won'"
                         :value-title="'€'"
                         :total-value-title="'Total win €'"
                         :has-alert="winValue === 0"
                         :value="winValue"
                         :total="winTotalValue">
            </balance-box>
        </div>
        <div class="actions">
            <button class="button-play"
                    @click="requestSpin()"
                    :disabled="isMechanismRotating || !hasEnoughCredits">
                Play
            </button>
            <button class="button-take-win"
                    @click="requestTakeWin()"
                    :disabled="isMechanismRotating || winValue == 0">
                Take Win
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import Reel from './Reel.vue'
    import BalanceBox from './BalanceBox.vue'
    import {ACTION_TYPES} from '../store/actions'
    import {Action, Getter} from 'vuex-class'
    import {GETTER_TYPES} from '../store/getters'
    import {Component, Vue} from 'vue-property-decorator'
    import {BAR, BARx2, BARx3, CHERRY, ICON7} from '../constants/Icons'
    import {BAR_WIN, BIG_WIN, SPIN, SPIN_END} from '../constants/Sounds'
    import {validateCombinationHasSymbols, validateCombinationX3} from '../validator/validateCombinations'

    @Component({
        components: {
            Reel,
            BalanceBox
        }
    })
    export default class Machine extends Vue {

        @Action(ACTION_TYPES.ACTION_PLAY)
        requestGamePlay: (gamePrice: number) => void;

        @Action(ACTION_TYPES.ACTION_DEPOSIT_AMOUNT)
        makeDeposit: (amount: number) => void;

        @Action(ACTION_TYPES.ACTION_APPLY_WIN_AMOUNT)
        applyWinningAmountAction: (amount: number) => void;

        @Action(ACTION_TYPES.ACTION_TAKE_WIN)
        requestTakeWin: () => void;

        @Action(ACTION_TYPES.ACTION_SET_REEL_COMBINATION)
        requestUpdateReelCombination: (data: { reelIndex: number, combination: Array<string> }) => void;

        @Getter(GETTER_TYPES.GETTER_CREDIT_AMOUNT)
        creditsValue: number;

        @Getter(GETTER_TYPES.GETTER_SPEND_TOTAL_AMOUNT)
        spendTotalValue: number;

        @Getter(GETTER_TYPES.GETTER_WIN_AMOUNT)
        winValue: number;

        @Getter(GETTER_TYPES.GETTER_WIN_TOTAL_AMOUNT)
        winTotalValue: number;

        @Getter(GETTER_TYPES.GETTER_IS_MECHANISM_ROTATING)
        isMechanismRotating: boolean;

        @Getter(GETTER_TYPES.GETTER_COMBINATION_MATRIX)
        combinationMatrix: Array<Array<string>>;

        @Getter(GETTER_TYPES.GETTER_IS_DEBUG_MODE_ENABLED)
        isDebugModeEnabled: boolean;

        requestSpin() {
            if (this.hasEnoughCredits) {
                if (this.isDebugModeEnabled)
                    console.debug('Spin command has been requested');
                this.requestGamePlay(1);
                this.$emit('requestSpin');
                SPIN.play(10.0);
            }
        }

        spinCompletionHandler(
            reelIndex: number,
            combination: Array<string>) {

            SPIN_END.play(0.0);
            this.requestUpdateReelCombination({reelIndex, combination});
            if (!this.isMechanismRotating) {
                this.validateWinningCombinations();
                SPIN.stop();
            }
        }

        get hasEnoughCredits(): boolean {
            return this.creditsValue > 0;
        }

        validateWinningCombinations(): void {
            const topLine: string[] = this.getRowCombination(0);
            const centerLine: string[] = this.getRowCombination(1);
            const bottomLine: string[] = this.getRowCombination(2);

            if (validateCombinationX3(topLine, CHERRY.code, true)) this.applyWinningAmount(2000, true);
            if (validateCombinationX3(centerLine, CHERRY.code, true)) this.applyWinningAmount(1000, true);
            if (validateCombinationX3(bottomLine, CHERRY.code, true)) this.applyWinningAmount(4000, true);

            if (validateCombinationX3(topLine, ICON7.code, true)) this.applyWinningAmount(150, true);
            if (validateCombinationX3(centerLine, ICON7.code, true)) this.applyWinningAmount(150, true);
            if (validateCombinationX3(bottomLine, ICON7.code, true)) this.applyWinningAmount(150, true);

            if (validateCombinationX3(topLine, BARx3.code, true)) this.applyWinningAmount(50, true);
            if (validateCombinationX3(centerLine, BARx3.code, true)) this.applyWinningAmount(50, true);
            if (validateCombinationX3(bottomLine, BARx3.code, true)) this.applyWinningAmount(50, true);

            if (validateCombinationX3(topLine, BARx2.code, true)) this.applyWinningAmount(20, true);
            if (validateCombinationX3(centerLine, BARx2.code, true)) this.applyWinningAmount(20, true);
            if (validateCombinationX3(bottomLine, BARx2.code, true)) this.applyWinningAmount(20, true);

            if (validateCombinationX3(topLine, BAR.code, true)) this.applyWinningAmount(10, true);
            if (validateCombinationX3(centerLine, BAR.code, true)) this.applyWinningAmount(10, true);
            if (validateCombinationX3(bottomLine, BAR.code, true)) this.applyWinningAmount(10, true);

            if (validateCombinationHasSymbols(topLine, [CHERRY.code, ICON7.code], true))
                this.applyWinningAmount(75, false);
            if (validateCombinationHasSymbols(centerLine, [CHERRY.code, ICON7.code], true))
                this.applyWinningAmount(75, false);
            if (validateCombinationHasSymbols(bottomLine, [CHERRY.code, ICON7.code], true))
                this.applyWinningAmount(75, false);

            if (validateCombinationHasSymbols(topLine, [BAR.code, BARx2.code, BARx3.code], true))
                this.applyWinningAmount(5, false);
            if (validateCombinationHasSymbols(centerLine, [BAR.code, BARx2.code, BARx3.code], true))
                this.applyWinningAmount(5, false);
            if (validateCombinationHasSymbols(bottomLine, [BAR.code, BARx2.code, BARx3.code], true))
                this.applyWinningAmount(5, false);
        }

        getRowCombination(rowIndex: number): string[] {
            return [
                this.combinationMatrix[0][rowIndex],
                this.combinationMatrix[1][rowIndex],
                this.combinationMatrix[2][rowIndex]
            ]
        }

        applyWinningAmount(amount: number, isBigWin: boolean) {
            this.applyWinningAmountAction(amount);
            if (isBigWin) BIG_WIN.play(0);
            else BAR_WIN.play(0);
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables.less";
    @import "../less/mixins.less";
    @import "../less/componnets/button.less";

    .button-play {
        .button-base(@colorWhite; @colorGreen; darken(@colorGreen, 25%));
    }

    .button-take-win {
        .button-base(@colorWhite; @colorRed; darken(@colorRed, 25%));
    }

    .machine {
        .border-radius(2px);
        width: 270px;
    }

    .reels {
        display: flex;
        position: relative;
    }

    .glass-shadow {
        border-radius: 4px 4px 0 0;
        pointer-events: none;
        z-index: 1000;
        position: absolute;
        width: 100%;
        height: 100%;
        .box-shadow(inset 0 0 10px #000000);
    }

    .pay-line {
        position: absolute;
        top: calc(90px * 1 * 1.1666);
        height: 1px;
        width: 100%;
        background: black;
    }

    .balance-area {
        display: flex;
        background: #000;
        justify-content: flex-end;
        padding: 10px 0;
    }

    .actions {
        padding: 20px 10px;
        display: flex;
        justify-content: flex-end;
        background: rgb(20, 20, 20);
        border-radius: 0 0 4px 4px;
    }
</style>