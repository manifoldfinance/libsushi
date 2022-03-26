import { TransactionDetails } from './reducer';
export declare function isTxPending(tx?: TransactionDetails): boolean;
export declare function isTxSuccessful(tx?: TransactionDetails): boolean;
export declare function isTxIndeterminate(tx?: TransactionDetails): boolean;
export declare function txMinutesPending(tx?: TransactionDetails): number;
export declare function isTxExpired(tx?: TransactionDetails): boolean;
