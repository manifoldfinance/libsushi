import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import * as _reduxjs_toolkit_dist_createReducer from '@reduxjs/toolkit/dist/createReducer';
import { TransactionReceipt, Provider } from '@ethersproject/providers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

/** @export ChainId */
declare enum ChainId {
    MAINNET = "1"
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
interface JsonRpcRequest {
    jsonrpc: '2.0';
    id: number | string | null;
    method: string;
    params?: unknown[] | unknown;
}
/**
 * @export
 * @interface JsonRpcError
 */
interface JsonRpcError {
    code: number;
    message: string;
    data?: unknown;
}
/**
 * @export
 * @interface JsonRpcResponse
 * @template T
 */
interface JsonRpcResponse<T> {
    jsonrpc: '2.0';
    id?: number | string | null;
    result?: T;
    error?: JsonRpcError;
}
/**
 * @export
 * @interface JsonRpcPayload
 */
interface JsonRpcPayload {
    jsonrpc: string;
    method: string;
    params?: any[];
    id?: string | number;
}
/**
 * @export
 * @class HttpJsonRpcError
 * @extends {Error}
 */
declare class HttpJsonRpcError extends Error {
    req?: JsonRpcRequest;
    res?: Response;
    constructor(message: string, req?: JsonRpcRequest, res?: Response);
}
/**
 * @export
 * @template T
 * @param {string} url
 * @param {Partial<JsonRpcRequest>} {
 * @return {(Promise<JsonRpcResponse<JsonRpcError | T>>)}
 */
declare function fetchJsonRpc<T>(url: string, { jsonrpc, id, method, params }: Partial<JsonRpcRequest>): Promise<JsonRpcResponse<JsonRpcError | T>>;
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
declare enum PrivateTxState {
    UNCHECKED = "UNCHECKED",
    PROCESSING = "PROCESSING",
    OK = "OK",
    INDETERMINATE = "INDETERMINATE",
    ERROR = "ERROR"
}
/** @type RelayResponses  */
declare type RelayResponses = Record<string, RelayResponse>;
/**
 *
 * @export
 * @interface RelayResponse
 */
interface RelayResponse {
    response: JsonRpcResponse<any>;
    error?: string;
}
/**
 *
 * @export
 * @interface PrivateTxStatus
 */
interface PrivateTxStatus {
    transactionHash: string;
    receivedAt: string;
    relayedAt?: string;
    minedAt?: string;
    relayFailure?: boolean;
    relayResponses?: RelayResponses;
}
/**
 *
 *
 * @export
 * @param {*} privateTx
 * @return {*}
 */
declare function privateTx(privateTx: any): any;

type privateTransaction_PrivateTxState = PrivateTxState;
declare const privateTransaction_PrivateTxState: typeof PrivateTxState;
type privateTransaction_RelayResponses = RelayResponses;
type privateTransaction_RelayResponse = RelayResponse;
type privateTransaction_PrivateTxStatus = PrivateTxStatus;
declare const privateTransaction_privateTx: typeof privateTx;
declare namespace privateTransaction {
  export {
    privateTransaction_PrivateTxState as PrivateTxState,
    privateTransaction_RelayResponses as RelayResponses,
    privateTransaction_RelayResponse as RelayResponse,
    privateTransaction_PrivateTxStatus as PrivateTxStatus,
    privateTransaction_privateTx as privateTx,
  };
}

/**
 * @export
 * @interface SerializableTransactionReceipt
 */
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
declare const addTransaction: _reduxjs_toolkit.ActionCreatorWithOptionalPayload<{
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
declare const clearAllTransactions: _reduxjs_toolkit.ActionCreatorWithOptionalPayload<{
    chainId: ChainId;
}, string>;
declare const finalizeTransaction: _reduxjs_toolkit.ActionCreatorWithOptionalPayload<{
    chainId: ChainId;
    hash: string;
    receipt: SerializableTransactionReceipt;
}, string>;
declare const checkedTransaction: _reduxjs_toolkit.ActionCreatorWithOptionalPayload<{
    chainId: ChainId;
    hash: string;
    blockNumber: number;
}, string>;
declare const updatePrivateTxStatus: _reduxjs_toolkit.ActionCreatorWithOptionalPayload<{
    chainId: ChainId;
    hash: string;
    status: PrivateTxStatus;
}, string>;
/**
 * @export
 * @interface TransactionDetails
 */
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
declare type txHash = string;
declare type TransactionState = {
    [key in ChainId]?: Record<txHash, TransactionDetails>;
};
declare const initialState: TransactionState;
declare const _default: _reduxjs_toolkit_dist_createReducer.ReducerWithInitialState<TransactionState>;

type reducer_TransactionDetails = TransactionDetails;
type reducer_TransactionState = TransactionState;
declare const reducer_initialState: typeof initialState;
declare namespace reducer {
  export {
    _default as default,
    reducer_TransactionDetails as TransactionDetails,
    reducer_TransactionState as TransactionState,
    reducer_initialState as initialState,
  };
}

/**
 *
 * @class PrivateTransaction
 * @license GPL-3.0-Only
 * @see {@link https://docs.manifoldfinance.com}
 * @since 2022.03
 * @version 0.1.0
 *
 */

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
declare function isTxPending(tx?: TransactionDetails): boolean;
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
declare function isTxSuccessful(tx?: TransactionDetails): boolean;
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
declare function isTxIndeterminate(tx?: TransactionDetails): boolean;
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {number}
 */
declare function txMinutesPending(tx?: TransactionDetails): number;
/**
 *
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
declare function isTxExpired(tx?: TransactionDetails): boolean;

declare const BURN_ADDRESS = 57005;

declare const AddressZero = "0x0000000000000000000000000000000000000000";

declare const EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA = "\u0019\u0001";

declare const DeadAddress = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";

/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
declare class RpcError<T = undefined> extends Error {
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
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
declare class ProviderRpcError<T = undefined> extends RpcError<T> {
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
declare class AddChainError extends Error {
    name: string;
    message: string;
}
declare class ChainNotConfiguredError extends Error {
    name: string;
    message: string;
}
declare class ConnectorAlreadyConnectedError extends Error {
    name: string;
    message: string;
}
declare class ConnectorNotFoundError extends Error {
    name: string;
    message: string;
}
declare class SwitchChainError extends ProviderRpcError {
    name: string;
    constructor(error: unknown);
}
declare class SwitchChainNotSupportedError extends Error {
    name: string;
    message: string;
}
declare class UserRejectedRequestError extends ProviderRpcError {
    name: string;
    constructor(error: unknown);
}
declare class ResourceUnavailableError extends RpcError {
    name: string;
    constructor(error: unknown);
}

declare const getTransactionError: (tx: TransactionResponse, receipt: TransactionReceipt, provider: Provider) => Promise<string>;
declare const parseReasonCode: (messageData: string) => string;

export { AddChainError, AddressZero, BURN_ADDRESS, ChainId, ChainNotConfiguredError, ConnectorAlreadyConnectedError, ConnectorNotFoundError, DeadAddress, EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA, HttpJsonRpcError, IJsonRpcError, IJsonRpcRequest, IJsonRpcResponse, IJsonRpcSuccess, JsonRpcError, JsonRpcMethod, JsonRpcPayload, JsonRpcRequest, JsonRpcResponse, privateTransaction as PrivateTransaction, PrivateTxState, PrivateTxStatus, ProviderRpcError, reducer as Reducer, RelayResponse, RelayResponses, ResourceUnavailableError, RpcError, SerializableTransactionReceipt, SwitchChainError, SwitchChainNotSupportedError, TransactionDetails$1 as TransactionDetails, UserRejectedRequestError, addTransaction, checkedTransaction, clearAllTransactions, fetchJsonRpc, finalizeTransaction, getTransactionError, isJsonRpcError, isJsonRpcSuccess, isTxExpired, isTxIndeterminate, isTxPending, isTxSuccessful, parseReasonCode, privateTx, txMinutesPending, updatePrivateTxStatus, validateJsonRpcResponse };
