import Vue from 'vue'
import {clone} from 'lodash'

export default class StateModel {

    reelLockMatrix: boolean[] = [false, false, false];

    reelRotationMatrix: boolean[] = [false, false, false];

    reelCombinationMatrix: Array<string[]> = [[], [], []];

    deposit: number = 0;

    spendTotalValue: number = 0;

    win: number = 0;

    winTotalValue: number = 0;

    isDebugModeEnabled: boolean = false;

    setDebugModeEnabled(isDebugModeEnabled: boolean): void {
        Vue.set(this, 'isDebugModeEnabled', isDebugModeEnabled);
    }

    setDeposit(deposit: number): void {
        Vue.set(this, 'deposit', deposit);
    }

    setSpendTotalValue(spendTotalValue: number): void {
        Vue.set(this, 'spendTotalValue', spendTotalValue);
    }

    setWin(win: number): void {
        Vue.set(this, 'win', win);
    }

    setWinTotalValue(winTotalValue: number): void {
        Vue.set(this, 'winTotalValue', winTotalValue);
    }

    setReelLocked(reelIndex: number, isLocked: boolean): void {
        let reelLockMatrix = clone(this.reelLockMatrix);
        reelLockMatrix[reelIndex] = isLocked;
        Vue.set(this, 'reelLockMatrix', reelLockMatrix);
    }

    isReelLocked(reelIndex: number): boolean {
        return this.reelLockMatrix[reelIndex];
    }

    getLockedReelsCount(): number {
        let count = 0;
        count += this.reelLockMatrix[0] ? 1 : 0;
        count += this.reelLockMatrix[1] ? 1 : 0;
        count += this.reelLockMatrix[2] ? 1 : 0;
        return count;
    }

    setReelRotating(reelIndex: number, isRotating: boolean): void {
        let reelRotationMatrix = clone(this.reelRotationMatrix);
        reelRotationMatrix[reelIndex] = isRotating;
        Vue.set(this, 'reelRotationMatrix', reelRotationMatrix);
    }

    isReelsRotating(): boolean {
        let count = 0;
        count += this.reelRotationMatrix[0] ? 1 : 0;
        count += this.reelRotationMatrix[1] ? 1 : 0;
        count += this.reelRotationMatrix[2] ? 1 : 0;
        return count !== 0;
    }

    setReelCombination(reelIndex: number, combination: string[]): void {
        let reelCombinationMatrix = clone(this.reelCombinationMatrix);
        reelCombinationMatrix[reelIndex] = combination;
        Vue.set(this, 'reelCombinationMatrix', reelCombinationMatrix);
    }
}