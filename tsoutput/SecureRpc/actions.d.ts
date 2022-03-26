import { PrivateTxState, PrivateTxStatus } from './OpenMevState';
import { ChainId } from './ChainId';
export interface SerializableTransactionReceipt {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    blockHash: string;
    transactionHash: string;
    blockNumber: number;
    status?: number;
}
export declare const addTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    from: string;
    approval?: {
        tokenAddress: string;
        spender: string;
    } | undefined;
    claim?: {
        recipient: string;
    } | undefined;
    summary?: string | undefined;
}, string>;
export declare const clearAllTransactions: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
}, string>;
export declare const finalizeTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    receipt: SerializableTransactionReceipt;
}, string>;
export declare const checkedTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    blockNumber: number;
}, string>;
export declare const updatePrivateTxStatus: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    status: PrivateTxStatus;
}, string>;
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
