import * as _reduxjs_toolkit from '@reduxjs/toolkit';

declare type JsonRpcMethod = 'eth_accounts' | 'eth_blockNumber' | 'eth_call' | 'eth_chainId' | 'eth_coinbase' | 'eth_estimateGas' | 'eth_gasPrice' | 'eth_getBalance' | 'eth_getBlockByHash' | 'eth_getBlockByNumber' | 'eth_getBlockTransactionCountByHash' | 'eth_getBlockTransactionCountByNumber' | 'eth_getCode' | 'eth_getLogs' | 'eth_getProof' | 'eth_getStorageAt' | 'eth_getTransactionByBlockHashAndIndex' | 'eth_getTransactionByBlockNumberAndIndex' | 'eth_getTransactionByHash' | 'eth_getTransactionCount' | 'eth_getTransactionReceipt' | 'eth_getUncleByBlockHashAndIndex' | 'eth_getUncleByBlockNumberAndIndex' | 'eth_getUncleCountByBlockHash' | 'eth_getUncleCountByBlockNumber' | 'eth_protocolVersion' | 'eth_sendRawTransaction' | 'eth_sendTransaction' | 'eth_sign' | 'eth_signTransaction' | 'eth_signTypedData' | 'eth_syncing';
interface IJsonRpcRequest<TMethod extends JsonRpcMethod, TParams extends Array<unknown>> {
    readonly jsonrpc: '2.0';
    readonly id: string | number | null;
    readonly method: TMethod;
    readonly params: TParams;
}
interface IJsonRpcSuccess<TResult> {
    readonly jsonrpc: '2.0';
    readonly id: string | number | null;
    readonly result: TResult;
}
interface IJsonRpcError {
    readonly jsonrpc: '2.0';
    readonly id: string | number | null;
    readonly error: {
        readonly code: number;
        readonly message: string;
        readonly data?: unknown;
    };
}
declare type IJsonRpcResponse<T> = IJsonRpcSuccess<T> | IJsonRpcError;
declare function validateJsonRpcResponse<T>(response: any): response is IJsonRpcResponse<T>;
declare function isJsonRpcSuccess<T>(response: IJsonRpcResponse<T>): response is IJsonRpcSuccess<T>;
declare function isJsonRpcError<T>(response: IJsonRpcResponse<T>): response is IJsonRpcError;

interface JsonRpcRequest {
    jsonrpc: '2.0';
    id: number | string | null;
    method: string;
    params?: unknown[] | unknown;
}
interface JsonRpcError {
    code: number;
    message: string;
    data?: unknown;
}
interface JsonRpcResponse<T> {
    jsonrpc: '2.0';
    id?: number | string | null;
    result?: T;
    error?: JsonRpcError;
}
declare class HttpJsonRpcError extends Error {
    req?: JsonRpcRequest | undefined;
    res?: Response | undefined;
    constructor(message: string, req?: JsonRpcRequest | undefined, res?: Response | undefined);
}
declare function fetchJsonRpc<T>(url: string, { jsonrpc, id, method, params }: Partial<JsonRpcRequest>): Promise<JsonRpcResponse<JsonRpcError | T>>;

declare enum ChainId {
    MAINNET = "1"
}

declare enum PrivateTxState {
    UNCHECKED = "UNCHECKED",
    PROCESSING = "PROCESSING",
    OK = "OK",
    INDETERMINATE = "INDETERMINATE",
    ERROR = "ERROR"
}
declare type RelayResponses = Record<string, RelayResponse>;
interface RelayResponse {
    response: JsonRpcResponse<any>;
    error?: string;
}
interface PrivateTxStatus {
    transactionHash: string;
    receivedAt: string;
    relayedAt?: string;
    minedAt?: string;
    relayFailure?: boolean;
    relayResponses?: RelayResponses;
}
declare function privateTx(privateTx: any): any;

interface SerializableTransactionReceipt {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    blockHash: string;
    transactionHash: string;
    blockNumber: number;
    status?: number;
}
declare const addTransaction: _reduxjs_toolkit.ActionCreatorWithPayload<{
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
declare const clearAllTransactions: _reduxjs_toolkit.ActionCreatorWithPayload<{
    chainId: ChainId;
}, string>;
declare const finalizeTransaction: _reduxjs_toolkit.ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    receipt: SerializableTransactionReceipt;
}, string>;
declare const checkedTransaction: _reduxjs_toolkit.ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    blockNumber: number;
}, string>;
declare const updatePrivateTxStatus: _reduxjs_toolkit.ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    status: PrivateTxStatus;
}, string>;
interface TransactionDetails$1 {
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

interface TransactionDetails {
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

declare function isTxPending(tx?: TransactionDetails): boolean;
declare function isTxSuccessful(tx?: TransactionDetails): boolean;
declare function isTxIndeterminate(tx?: TransactionDetails): boolean;
declare function txMinutesPending(tx?: TransactionDetails): number;
declare function isTxExpired(tx?: TransactionDetails): boolean;

declare const privateTransaction_isTxPending: typeof isTxPending;
declare const privateTransaction_isTxSuccessful: typeof isTxSuccessful;
declare const privateTransaction_isTxIndeterminate: typeof isTxIndeterminate;
declare const privateTransaction_txMinutesPending: typeof txMinutesPending;
declare const privateTransaction_isTxExpired: typeof isTxExpired;
declare namespace privateTransaction {
  export {
    privateTransaction_isTxPending as isTxPending,
    privateTransaction_isTxSuccessful as isTxSuccessful,
    privateTransaction_isTxIndeterminate as isTxIndeterminate,
    privateTransaction_txMinutesPending as txMinutesPending,
    privateTransaction_isTxExpired as isTxExpired,
  };
}

export { ChainId, HttpJsonRpcError, IJsonRpcError, IJsonRpcRequest, IJsonRpcResponse, IJsonRpcSuccess, JsonRpcError, JsonRpcMethod, JsonRpcRequest, JsonRpcResponse, privateTransaction as PrivateTransaction, PrivateTxState, PrivateTxStatus, RelayResponse, RelayResponses, SerializableTransactionReceipt, TransactionDetails$1 as TransactionDetails, addTransaction, checkedTransaction, clearAllTransactions, fetchJsonRpc, finalizeTransaction, isJsonRpcError, isJsonRpcSuccess, isTxExpired, isTxIndeterminate, isTxPending, isTxSuccessful, privateTx, txMinutesPending, updatePrivateTxStatus, validateJsonRpcResponse };
