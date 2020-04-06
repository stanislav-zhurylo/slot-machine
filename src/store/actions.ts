import {ActionContext, ActionTree} from 'vuex'
import StateModel from '../model/StateModel'
import {MUTATION_TYPES} from './mutations'

export const ACTION_TYPES = {
    ACTION_PLAY: 'ACTION_PLAY',
    ACTION_INVERT_REEL_LOCK: 'ACTION_INVERT_REEL_LOCK',
    ACTION_SET_REEL_ROTATING: 'ACTION_SET_REEL_ROTATING',
    ACTION_SET_REEL_COMBINATION: 'ACTION_SET_REEL_COMBINATION',
    ACTION_TAKE_WIN: 'ACTION_TAKE_WIN',
    ACTION_APPLY_WIN_AMOUNT: 'ACTION_APPLY_WIN_AMOUNT',
    ACTION_DEPOSIT_AMOUNT: 'ACTION_DEPOSIT_AMOUNT',
    ACTION_SET_DEBUG_NODE_ENABLED: 'ACTION_SET_DEBUG_NODE_ENABLED',
};

const actions = <ActionTree<StateModel, any>>{
    [ACTION_TYPES.ACTION_PLAY]
    (store: ActionContext<StateModel, any>, gamePrice: number): void {
        store.commit(MUTATION_TYPES.MUTATION_PLAY_COMMAND_RECEIVED, gamePrice);
    },
    [ACTION_TYPES.ACTION_INVERT_REEL_LOCK]
    (store: ActionContext<StateModel, any>, reelIndex: number): void {
        store.commit(MUTATION_TYPES.MUTATION_INVERT_REEL_LOCK_COMMAND_RECEIVED, reelIndex);
    },
    [ACTION_TYPES.ACTION_SET_REEL_ROTATING]
    (store: ActionContext<StateModel, any>, data: { reelIndex: number, isRotating: boolean }): void {
        store.commit(MUTATION_TYPES.MUTATION_SET_REEL_ROTATING_COMMAND_RECEIVED, data);
    },
    [ACTION_TYPES.ACTION_SET_REEL_COMBINATION]
    (store: ActionContext<StateModel, any>, data: { reelIndex: number, combination: Array<string> }): void {
        store.commit(MUTATION_TYPES.MUTATION_SET_REEL_COMBINATION_COMMAND_RECEIVED, data);
    },
    [ACTION_TYPES.ACTION_TAKE_WIN]
    (store: ActionContext<StateModel, any>): void {
        store.commit(MUTATION_TYPES.MUTATION_TAKE_WIN_COMMAND_RECEIVED);
    },
    [ACTION_TYPES.ACTION_APPLY_WIN_AMOUNT]
    (store: ActionContext<StateModel, any>, amount: number): void {
        store.commit(MUTATION_TYPES.MUTATION_APPLY_WIN_COMMAND_RECEIVED, amount);
    },
    [ACTION_TYPES.ACTION_DEPOSIT_AMOUNT]
    (store: ActionContext<StateModel, any>, amount: number): void {
        store.commit(MUTATION_TYPES.MUTATION_DEPOSIT_RECEIVED, amount)
    },
    [ACTION_TYPES.ACTION_SET_DEBUG_NODE_ENABLED]
    (store: ActionContext<StateModel, any>, isDebugModeEnabled: boolean): void {
        store.commit(MUTATION_TYPES.MUTATION_SET_DEBUG_MODE_ENABLED_COMMAND_RECEIVED, isDebugModeEnabled)
    }
};

export default actions;