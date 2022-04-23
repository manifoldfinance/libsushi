/**
 * @filename Redux Action
 * @version 0.2.0
 */
import { createAction } from '@reduxjs/toolkit';
import { PrivateTxState, PrivateTxStatus } from './privateTransaction';
import { ChainId } from './ChainId';

/**
 * @export
 * @interface SerializableTransactionReceipt
 */
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

export const addTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  from: string;
  approval?: { tokenAddress: string; spender: string };
  claim?: { recipient: string };
  summary?: string;
}>('transactions/addTransaction');
export const clearAllTransactions = createAction<{ chainId: ChainId }>('transactions/clearAllTransactions');
export const finalizeTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>('transactions/finalizeTransaction');
export const checkedTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  blockNumber: number;
}>('transactions/checkedTransaction');
export const updatePrivateTxStatus = createAction<{
  chainId: ChainId;
  hash: string;
  status: PrivateTxStatus;
}>('transactions/updatePrivateTxStatus');

/**
 * @export
 * @interface TransactionDetails
 */
export interface TransactionDetails {
  hash: string;
  approval?: { tokenAddress: string; spender: string };
  summary?: string;
  claim?: { recipient: string };
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
