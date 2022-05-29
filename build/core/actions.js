/**
 * @filename Redux Action
 * @version 0.2.0
 */
import { createAction } from '@reduxjs/toolkit';
export const addTransaction = createAction('transactions/addTransaction');
export const clearAllTransactions = createAction('transactions/clearAllTransactions');
export const finalizeTransaction = createAction('transactions/finalizeTransaction');
export const checkedTransaction = createAction('transactions/checkedTransaction');
export const updatePrivateTxStatus = createAction('transactions/updatePrivateTxStatus');
