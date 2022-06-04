import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import { Provider } from '@ethersproject/providers';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { TransactionReceipt } from '@ethersproject/providers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export declare class AddChainError extends Error {
    name: string;
    message: string;
}

export declare const AddressZero = "0x0000000000000000000000000000000000000000";

export declare const addTransaction: ActionCreatorWithOptionalPayload<    {
chainId: ChainId;
hash: string;
from: string;
approval?: {
tokenAddress: string;
spender: string;
};
claim?: {
recipient: string;
};
summary?: string;
}, string>;

export declare const BURN_ADDRESS = 57005;

/** @export ChainId */
export declare enum ChainId {
    MAINNET = "1"
}

export declare class ChainNotConfiguredError extends Error {
    name: string;
    message: string;
}

export declare const checkedTransaction: ActionCreatorWithOptionalPayload<    {
chainId: ChainId;
hash: string;
blockNumber: number;
}, string>;

export declare const clearAllTransactions: ActionCreatorWithOptionalPayload<    {
chainId: ChainId;
}, string>;

export declare class ConnectorAlreadyConnectedError extends Error {
    name: string;
    message: string;
}

export declare class ConnectorNotFoundError extends Error {
    name: string;
    message: string;
}

export declare const DeadAddress = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";

declare const _default: ReducerWithInitialState<TransactionState>;

export declare const EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA = "\u0019\u0001";

/**
 * @export
 * @template T
 * @param {string} url
 * @param {Partial<JsonRpcRequest>} {
 * @return {(Promise<JsonRpcResponse<JsonRpcError | T>>)}
 */
export declare function fetchJsonRpc<T>(url: string, { jsonrpc, id, method, params }: Partial<JsonRpcRequest>): Promise<JsonRpcResponse<JsonRpcError | T>>;

export declare const finalizeTransaction: ActionCreatorWithOptionalPayload<    {
chainId: ChainId;
hash: string;
receipt: SerializableTransactionReceipt;
}, string>;

export declare const getTransactionError: (tx: TransactionResponse, receipt: TransactionReceipt, provider: Provider) => Promise<string>;

/**
 * @export
 * @class HttpJsonRpcError
 * @extends {Error}
 */
export declare class HttpJsonRpcError extends Error {
    req?: JsonRpcRequest;
    res?: Response;
    constructor(message: string, req?: JsonRpcRequest, res?: Response);
}

export declare interface IJsonRpcError {
    readonly jsonrpc: '2.0';
    readonly id: string | number | null;
    readonly error: {
        readonly code: number;
        readonly message: string;
        readonly data?: unknown;
    };
}

export declare interface IJsonRpcRequest<TMethod extends JsonRpcMethod, TParams extends Array<unknown>> {
    readonly jsonrpc: '2.0';
    readonly id: string | number | null;
    readonly method: TMethod;
    readonly params: TParams;
}

export declare type IJsonRpcResponse<T> = IJsonRpcSuccess<T> | IJsonRpcError;

export declare interface IJsonRpcSuccess<TResult> {
    readonly jsonrpc: '2.0';
    readonly id: string | number | null;
    readonly result: TResult;
}

declare const initialState: TransactionState;

export declare function isJsonRpcError<T>(response: IJsonRpcResponse<T>): response is IJsonRpcError;

export declare function isJsonRpcSuccess<T>(response: IJsonRpcResponse<T>): response is IJsonRpcSuccess<T>;

/**
 *
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export declare function isTxExpired(tx?: TransactionDetails_2): boolean;

/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export declare function isTxIndeterminate(tx?: TransactionDetails_2): boolean;

/**
 * @summary
 * Basic explanation of the tx state types:
 * UNCHECKED -> Tx status has not been checked and there's no information about it.
 * PROCESSING -> Tx checks are in place until a resolution happens: OK, INDETERMINATE, ERROR.
 * OK -> Relay received the Tx && all downstream miners accepted without complains && tx mined successfully
 * INDETERMINATE -> Relay received correctly the Tx && at least one miner accepted the TX && TX potentially mineable
 * ERROR -> Relay haven't received the TX || none of the miners accepted the Tx || Tx was not mined successfully
 */
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export declare function isTxPending(tx?: TransactionDetails_2): boolean;

/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export declare function isTxSuccessful(tx?: TransactionDetails_2): boolean;

/**
 * @export
 * @interface JsonRpcError
 */
export declare interface JsonRpcError {
    code: number;
    message: string;
    data?: unknown;
}

export declare type JsonRpcMethod = 'eth_accounts' | 'eth_blockNumber' | 'eth_call' | 'eth_chainId' | 'eth_coinbase' | 'eth_estimateGas' | 'eth_gasPrice' | 'eth_getBalance' | 'eth_getBlockByHash' | 'eth_getBlockByNumber' | 'eth_getBlockTransactionCountByHash' | 'eth_getBlockTransactionCountByNumber' | 'eth_getCode' | 'eth_getLogs' | 'eth_getProof' | 'eth_getStorageAt' | 'eth_getTransactionByBlockHashAndIndex' | 'eth_getTransactionByBlockNumberAndIndex' | 'eth_getTransactionByHash' | 'eth_getTransactionCount' | 'eth_getTransactionReceipt' | 'eth_getUncleByBlockHashAndIndex' | 'eth_getUncleByBlockNumberAndIndex' | 'eth_getUncleCountByBlockHash' | 'eth_getUncleCountByBlockNumber' | 'eth_protocolVersion' | 'eth_sendRawTransaction' | 'eth_sendTransaction' | 'eth_sign' | 'eth_signTransaction' | 'eth_signTypedData' | 'eth_syncing';

/**
 * @export
 * @interface JsonRpcPayload
 */
export declare interface JsonRpcPayload {
    jsonrpc: string;
    method: string;
    params?: any[];
    id?: string | number;
}

/**
 * @file JsonRpc
 * @version 0.3.0
 * @license Apache-2.0
 *
 */
/**
 * JsonRpcRequest
 * @export
 * @interface JsonRpcRequest
 */
export declare interface JsonRpcRequest {
    jsonrpc: '2.0';
    id: number | string | null;
    method: string;
    params?: unknown[] | unknown;
}

/**
 * @export
 * @interface JsonRpcResponse
 * @template T
 */
export declare interface JsonRpcResponse<T> {
    jsonrpc: '2.0';
    id?: number | string | null;
    result?: T;
    error?: JsonRpcError;
}

export declare const parseReasonCode: (messageData: string) => string;

declare namespace PrivateTransaction {
    export {
        privateTx,
        PrivateTxState,
        RelayResponses,
        RelayResponse,
        PrivateTxStatus
    }
}
export { PrivateTransaction }

/**
 *
 *
 * @export
 * @param {*} privateTx
 * @return {*}
 */
export declare function privateTx(privateTx: any): any;

/**
 *   @enum PrivateTxState
 *  @interface PrivateTxStatus
 *  @interface RelayResponse
 *  @description Transaction State Types
 *
 * - UNCHECKED -> Tx status has not been checked and there's no information about it.
 * - PROCESSING -> Tx checks are in place until a resolution happens: OK, INDETERMINATE, ERROR.
 * - OK -> Relay received the Tx && all downstream miners accepted without complains && tx mined successfully
 * - INDETERMINATE -> Relay received correctly the Tx && at least one miner accepted the TX && TX potentially mineable
 * - ERROR -> Relay haven't received the TX || none of the miners accepted the Tx || Tx was not mined successfully
 *
 /**
 *
 *
 * @export
 * @enum {number}
 */
export declare enum PrivateTxState {
    UNCHECKED = "UNCHECKED",
    PROCESSING = "PROCESSING",
    OK = "OK",
    INDETERMINATE = "INDETERMINATE",
    ERROR = "ERROR"
}

/**
 *
 * @export
 * @interface PrivateTxStatus
 */
export declare interface PrivateTxStatus {
    transactionHash: string;
    receivedAt: string;
    relayedAt?: string;
    minedAt?: string;
    relayFailure?: boolean;
    relayResponses?: RelayResponses;
}

/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
export declare class ProviderRpcError<T = undefined> extends RpcError<T> {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(
    /**
     * Number error code
     * @see https://eips.ethereum.org/EIPS/eip-1193#error-standards
     */
    code: 4001 | 4100 | 4200 | 4900 | 4901 | 4902, 
    /** Human-readable string */
    message: string, 
    /** Low-level error */
    internal?: unknown, 
    /** Other useful information about error */
    data?: T);
}

declare namespace Reducer {
    export {
        TransactionDetails_2 as TransactionDetails,
        TransactionState,
        initialState,
        _default as default
    }
}
export { Reducer }

/**
 *
 * @export
 * @interface RelayResponse
 */
export declare interface RelayResponse {
    response: JsonRpcResponse<any>;
    error?: string;
}

/** @type RelayResponses  */
export declare type RelayResponses = Record<string, RelayResponse>;

export declare class ResourceUnavailableError extends RpcError {
    name: string;
    constructor(error: unknown);
}

/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
export declare class RpcError<T = undefined> extends Error {
    readonly code: number;
    readonly data?: T;
    readonly internal?: unknown;
    constructor(
    /** Number error code */
    code: number, 
    /** Human-readable string */
    message: string, 
    /** Low-level error */
    internal?: unknown, 
    /** Other useful information about error */
    data?: T);
}

/**
 * @export
 * @interface SerializableTransactionReceipt
 */
export declare interface SerializableTransactionReceipt {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    blockHash: string;
    transactionHash: string;
    blockNumber: number;
    status?: number;
}

export declare class SwitchChainError extends ProviderRpcError {
    name: string;
    constructor(error: unknown);
}

export declare class SwitchChainNotSupportedError extends Error {
    name: string;
    message: string;
}

/**
 * @export
 * @interface TransactionDetails
 */
export declare interface TransactionDetails {
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

declare interface TransactionDetails_2 {
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

declare type TransactionState = {
    [key in ChainId]?: Record<txHash, TransactionDetails_2>;
};

declare type txHash = string;

/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {number}
 */
export declare function txMinutesPending(tx?: TransactionDetails_2): number;

export declare const updatePrivateTxStatus: ActionCreatorWithOptionalPayload<    {
chainId: ChainId;
hash: string;
status: PrivateTxStatus;
}, string>;

export declare class UserRejectedRequestError extends ProviderRpcError {
    name: string;
    constructor(error: unknown);
}

export declare function validateJsonRpcResponse<T>(response: any): response is IJsonRpcResponse<T>;

export { }
