/**
 *
 * @filename Redux Reducer
 *
 */
import { ChainId } from './ChainId';
import { PrivateTxState, PrivateTxStatus } from './privateTransaction';
import { SerializableTransactionReceipt } from './actions';
export interface TransactionDetails {
    hash: string;
    approval?: {
        tokenAddress: string;
        spender: string;
    };
    summary?: string;
    claim?: {
        recipient: string;
    };
    receipt?: SerializableTransactionReceipt;
    lastCheckedBlockNumber?: number;
    addedTime: number;
    confirmedTime?: number;
    from: string;
    privateTx?: {
        state: PrivateTxState;
        status?: PrivateTxStatus;
    };
}
declare type txHash = string;
export declare type TransactionState = {
    [key in ChainId]?: Record<txHash, TransactionDetails>;
};
export declare const initialState: TransactionState;
declare const _default: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<TransactionState>;
export default _default;
