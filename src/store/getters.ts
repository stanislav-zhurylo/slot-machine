import {GetterTree} from 'vuex'
import StateModel from '../model/StateModel'

export const GETTER_TYPES = {
    GETTER_CREDIT_AMOUNT: 'GETTER_CREDIT_AMOUNT',
    GETTER_SPEND_TOTAL_AMOUNT: 'GETTER_SPEND_TOTAL_AMOUNT',
    GETTER_WIN_AMOUNT: 'GETTER_WIN_AMOUNT',
    GETTER_WIN_TOTAL_AMOUNT: 'GETTER_WIN_TOTAL_AMOUNT',
    GETTER_IS_REEL_LOCKED: 'GETTER_IS_REEL_LOCKED',
    GETTER_IS_MECHANISM_ROTATING: 'GETTER_IS_MECHANISM_ROTATING',
    GETTER_COMBINATION_MATRIX: 'GETTER_COMBINATION_MATRIX',
    GETTER_IS_DEBUG_MODE_ENABLED: 'GETTER_IS_DEBUG_MODE_ENABLED',
};

const getters = <GetterTree<StateModel, any>>{
    [GETTER_TYPES.GETTER_CREDIT_AMOUNT]
    (state: StateModel): number {
        return state.deposit;
    },
    [GETTER_TYPES.GETTER_SPEND_TOTAL_AMOUNT]
    (state: StateModel): number {
        return state.spendTotalValue;
    },
    [GETTER_TYPES.GETTER_WIN_AMOUNT]
    (state: StateModel): number {
        return state.win;
    },
    [GETTER_TYPES.GETTER_WIN_TOTAL_AMOUNT]
    (state: StateModel): number {
        return state.winTotalValue;
    },
    [GETTER_TYPES.GETTER_IS_REEL_LOCKED]: (state: StateModel) => (reelIndex: number): boolean => {
        return state.isReelLocked(reelIndex);
    },
    [GETTER_TYPES.GETTER_IS_MECHANISM_ROTATING]
    (state: StateModel): boolean {
        return state.isReelsRotating();
    },
    [GETTER_TYPES.GETTER_COMBINATION_MATRIX]
    (state: StateModel): Array<Array<string>> {
        return state.reelCombinationMatrix;
    },
    [GETTER_TYPES.GETTER_IS_DEBUG_MODE_ENABLED]
    (state: StateModel): boolean {
        return state.isDebugModeEnabled;
    },
};
export default getters;