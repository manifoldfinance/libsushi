import { JsonRpcResponse } from '../JsonRpc/index';
export declare enum PrivateTxState {
    UNCHECKED = "UNCHECKED",
    PROCESSING = "PROCESSING",
    OK = "OK",
    INDETERMINATE = "INDETERMINATE",
    ERROR = "ERROR"
}
export declare type RelayResponses = Record<string, RelayResponse>;
export interface RelayResponse {
    response: JsonRpcResponse<any>;
    error?: string;
}
export interface PrivateTxStatus {
    transactionHash: string;
    receivedAt: string;
    relayedAt?: string;
    minedAt?: string;
    relayFailure?: boolean;
    relayResponses?: RelayResponses;
}
