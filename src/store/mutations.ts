import {MutationTree} from 'vuex'
import StateModel from '../model/StateModel'

export const MUTATION_TYPES = {
    MUTATION_PLAY_COMMAND_RECEIVED: 'MUTATION_PLAY_COMMAND_RECEIVED',
    MUTATION_INVERT_REEL_LOCK_COMMAND_RECEIVED: 'MUTATION_INVERT_REEL_LOCK_COMMAND_RECEIVED',
    MUTATION_SET_REEL_ROTATING_COMMAND_RECEIVED: 'MUTATION_SET_REEL_ROTATING_COMMAND_RECEIVED',
    MUTATION_SET_REEL_COMBINATION_COMMAND_RECEIVED: 'MUTATION_SET_REEL_COMBINATION_COMMAND_RECEIVED',
    MUTATION_SET_DEBUG_MODE_ENABLED_COMMAND_RECEIVED: 'MUTATION_SET_DEBUG_MODE_ENABLED_COMMAND_RECEIVED',
    MUTATION_TAKE_WIN_COMMAND_RECEIVED: 'MUTATION_TAKE_WIN_COMMAND_RECEIVED',
    MUTATION_APPLY_WIN_COMMAND_RECEIVED: 'MUTATION_APPLY_WIN_COMMAND_RECEIVED',
    MUTATION_DEPOSIT_RECEIVED: 'MUTATION_DEPOSIT_RECEIVED',
};

const mutations = <MutationTree<StateModel>>{
    [MUTATION_TYPES.MUTATION_PLAY_COMMAND_RECEIVED]
    (state: StateModel, gamePrice: number): void {
        if (state.deposit >= gamePrice)
            state.setDeposit(state.deposit - gamePrice);
    },
    [MUTATION_TYPES.MUTATION_INVERT_REEL_LOCK_COMMAND_RECEIVED]
    (state: StateModel, reelIndex: number): void {
        if (state.isReelLocked(reelIndex))
            state.setReelLocked(reelIndex, false);
        else if (state.getLockedReelsCount() < 2)
            state.setReelLocked(reelIndex, true);
    },
    [MUTATION_TYPES.MUTATION_SET_REEL_ROTATING_COMMAND_RECEIVED]
    (state: StateModel, data: { reelIndex: number, isRotating: boolean }): void {
        state.setReelRotating(data.reelIndex, data.isRotating)
    },
    [MUTATION_TYPES.MUTATION_SET_REEL_COMBINATION_COMMAND_RECEIVED]
    (state: StateModel, data: { reelIndex: number, combination: Array<string> }): void {
        state.setReelCombination(data.reelIndex, data.combination)
    },
    [MUTATION_TYPES.MUTATION_TAKE_WIN_COMMAND_RECEIVED]
    (state: StateModel): void {
        state.setDeposit(state.deposit + state.win);
        state.setWin(0);
    },
    [MUTATION_TYPES.MUTATION_APPLY_WIN_COMMAND_RECEIVED]
    (state: StateModel, amount: number): void {
        state.setWin(state.win + amount);
        state.setWinTotalValue(state.winTotalValue + amount);
    },
    [MUTATION_TYPES.MUTATION_DEPOSIT_RECEIVED]
    (state: StateModel, amount: number): void {
        state.setDeposit(state.deposit + amount);
        state.setSpendTotalValue(state.spendTotalValue + amount);
    },
    [MUTATION_TYPES.MUTATION_SET_DEBUG_MODE_ENABLED_COMMAND_RECEIVED]
    (state: StateModel, isDebugModeEnabled: boolean): void {
        state.setDebugModeEnabled(isDebugModeEnabled);
    },
};
export default mutations;