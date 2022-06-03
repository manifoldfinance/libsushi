import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import * as _reduxjs_toolkit_dist_createReducer from '@reduxjs/toolkit/dist/createReducer';
import { TransactionReceipt, Provider } from '@ethersproject/providers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

declare enum ChainId {
    MAINNET = "1",
    OPENMEV = "73300705280",
    GORELI = "5"
}
declare let OPENMEV_SUPPORTED_NETWORKS: ChainId[];
declare enum OPENMEV_METAMASK_CHAIN_ID {
    MAINNET = "0x1"
}
declare const OPENMEV_METAMASK_SUPPORTED_NETWORKS: OPENMEV_METAMASK_CHAIN_ID[];
declare const MAINNET_RPC_URL: string;

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
    req?: JsonRpcRequest | undefined;
    res?: Response | undefined;
    constructor(message: string, req?: JsonRpcRequest | undefined, res?: Response | undefined);
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
 * @latest 2022.06
 * @version 0.2.0
 *
 */

/**

@NOTE Eth2 Changes Below

```markdown
| Block Tags |  Description  |
|---|---|
| earliest |  The lowest numbered block the client has available  |
| finalized |  The most recent crypto-economically secure block  cannot be re-orged outside of manual intervention driven by community coordination |
| safe |  The most recent block that is safe from re-orgs under honest majority and certain synchronicity assumptions  |
| unsafe |  The most recent block in the canonical chain observed by the client this block can be re-orged out of the canonical chain |
| pending |  A sample next block built by the client on top of unsafe and containing the set of transactions usually taken from local mempool  |
| latest |  DEPRECATED Currently an alias for unsafe will be removed at some point in the future |
```
*/
/**
 * @export BlockSpecifier
 * @summary Specifies a block.  Can be given by number, or can be given via the
 *     special strings "genesis", "latest", or "pending".
 *
 * @warning Using `pending`, while allowed, is not advised, as it may lead
 * to internally inconsistent results.  Use of `latest` is safe and will not
 * lead to inconsistent results. Depending on the backing RPC networks caching system,
 * the usage of `pending` may lead to inconsistencies as a result of an
 * overly aggressive cache system. This may cause downstream errors/invalid states.
 *
 * @category Inputs
 */
declare type BlockSpecifier = number | "genesis" | "latest" | "pending";
/** @export RegularizedBlockSpecifier */
declare type RegularizedBlockSpecifier = number | "pending";
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

declare const BURN_ADDRESS = "0x000000000000000000000000000000000000dead";

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

declare type ErrorSignature = {
    r: string;
    s: string;
    yParity: 0 | 1;
    networkV: bigint;
};
declare type ErrorAccessList = Array<{
    address: string;
    storageKeys: Array<string>;
}>;
interface ErrorTransaction {
    type?: number;
    to?: string;
    from?: string;
    nonce?: number;
    gasLimit?: bigint;
    gasPrice?: bigint;
    maxPriorityFeePerGas?: bigint;
    maxFeePerGas?: bigint;
    data?: string;
    value?: bigint;
    chainId?: bigint;
    hash?: string;
    signature?: ErrorSignature;
    accessList?: ErrorAccessList;
}
interface ErrorFetchRequestWithBody extends ErrorFetchRequest {
    body: Readonly<Uint8Array>;
}
interface ErrorFetchRequest {
    url: string;
    method: string;
    headers: Readonly<Record<string, string>>;
    getHeader(key: string): string;
    body: null | Readonly<Uint8Array>;
    hasBody(): this is ErrorFetchRequestWithBody;
}
interface ErrorFetchResponseWithBody extends ErrorFetchResponse {
    body: Readonly<Uint8Array>;
}
interface ErrorFetchResponse {
    statusCode: number;
    statusMessage: string;
    headers: Readonly<Record<string, string>>;
    getHeader(key: string): string;
    body: null | Readonly<Uint8Array>;
    hasBody(): this is ErrorFetchResponseWithBody;
}
/**
 * @export ErrorCode
 * @summary EthersJs ErrorCode
 */
declare type ErrorCode = 'UNKNOWN_ERROR' | 'NOT_IMPLEMENTED' | 'UNSUPPORTED_OPERATION' | 'NETWORK_ERROR' | 'SERVER_ERROR' | 'TIMEOUT' | 'BAD_DATA' | 'BUFFER_OVERRUN' | 'NUMERIC_FAULT' | 'INVALID_ARGUMENT' | 'MISSING_ARGUMENT' | 'UNEXPECTED_ARGUMENT' | 'VALUE_MISMATCH' | 'CALL_EXCEPTION' | 'INSUFFICIENT_FUNDS' | 'NONCE_EXPIRED' | 'REPLACEMENT_UNDERPRICED' | 'TRANSACTION_REPLACED' | 'UNPREDICTABLE_GAS_LIMIT' | 'UNCONFIGURED_NAME' | 'OFFCHAIN_FAULT';
interface EthersError<T extends ErrorCode = ErrorCode> extends Error {
    code: ErrorCode;
    info?: Record<string, any>;
    error?: Error;
}
interface UnknownError extends EthersError<'UNKNOWN_ERROR'> {
    [key: string]: any;
}
interface NotImplementedError extends EthersError<'NOT_IMPLEMENTED'> {
    operation: string;
}
interface UnsupportedOperationError extends EthersError<'UNSUPPORTED_OPERATION'> {
    operation: string;
}
interface NetworkError extends EthersError<'NETWORK_ERROR'> {
    event: string;
}
interface ServerError extends EthersError<'SERVER_ERROR'> {
    request: ErrorFetchRequest | string;
    response?: ErrorFetchResponse;
}
interface TimeoutError extends EthersError<'TIMEOUT'> {
    operation: string;
    reason: string;
    request?: ErrorFetchRequest;
}
interface BadDataError extends EthersError<'BAD_DATA'> {
    value: any;
}
interface BufferOverrunError extends EthersError<'BUFFER_OVERRUN'> {
    buffer: Uint8Array;
    length: number;
    offset: number;
}
interface NumericFaultError extends EthersError<'NUMERIC_FAULT'> {
    operation: string;
    fault: string;
    value: any;
}
interface InvalidArgumentError extends EthersError<'INVALID_ARGUMENT'> {
    argument: string;
    value: any;
    info?: Record<string, any>;
}
interface MissingArgumentError extends EthersError<'MISSING_ARGUMENT'> {
    count: number;
    expectedCount: number;
}
interface UnexpectedArgumentError extends EthersError<'UNEXPECTED_ARGUMENT'> {
    count: number;
    expectedCount: number;
}
interface CallExceptionError extends EthersError<'CALL_EXCEPTION'> {
    data: string;
    transaction?: any;
    method?: string;
    signature?: string;
    args?: ReadonlyArray<any>;
    errorSignature?: string;
    errorName?: string;
    errorArgs?: ReadonlyArray<any>;
    reason?: string;
}
interface InsufficientFundsError extends EthersError<'INSUFFICIENT_FUNDS'> {
    transaction: any;
}
interface NonceExpiredError extends EthersError<'NONCE_EXPIRED'> {
    transaction: any;
}
interface OffchainFaultError extends EthersError<'OFFCHAIN_FAULT'> {
    transaction?: any;
    reason: string;
}
interface ReplacementUnderpricedError extends EthersError<'REPLACEMENT_UNDERPRICED'> {
    transaction: any;
}
interface TransactionReplacedError extends EthersError<'TRANSACTION_REPLACED'> {
    cancelled: boolean;
    reason: 'repriced' | 'cancelled' | 'replaced';
    hash: string;
    replacement: any;
    receipt: any;
}
interface UnconfiguredNameError extends EthersError<'UNCONFIGURED_NAME'> {
    value: string;
}
interface UnpredictableGasLimitError extends EthersError<'UNPREDICTABLE_GAS_LIMIT'> {
    transaction: any;
}
/**
 * @export CodedEthersError
 */
declare type CodedEthersError<T> = T extends "UNKNOWN_ERROR" ? UnknownError : T extends "NOT_IMPLEMENTED" ? NotImplementedError : T extends "UNSUPPORTED_OPERATION" ? UnsupportedOperationError : T extends "NETWORK_ERROR" ? NetworkError : T extends "SERVER_ERROR" ? ServerError : T extends "TIMEOUT" ? TimeoutError : T extends "BAD_DATA" ? BadDataError : T extends "BUFFER_OVERRUN" ? BufferOverrunError : T extends "NUMERIC_FAULT" ? NumericFaultError : T extends "INVALID_ARGUMENT" ? InvalidArgumentError : T extends "MISSING_ARGUMENT" ? MissingArgumentError : T extends "UNEXPECTED_ARGUMENT" ? UnexpectedArgumentError : T extends "CALL_EXCEPTION" ? CallExceptionError : T extends "INSUFFICIENT_FUNDS" ? InsufficientFundsError : T extends "NONCE_EXPIRED" ? NonceExpiredError : T extends "OFFCHAIN_FAULT" ? OffchainFaultError : T extends "REPLACEMENT_UNDERPRICED" ? ReplacementUnderpricedError : T extends "TRANSACTION_REPLACED" ? TransactionReplacedError : T extends "UNCONFIGURED_NAME" ? UnconfiguredNameError : T extends "UNPREDICTABLE_GAS_LIMIT" ? UnpredictableGasLimitError : never;
/**
 * #isError
 * @param error
 * @param code
 * @returns
 */
declare function isError<K extends ErrorCode, T extends CodedEthersError<K>>(error: any, code: K): error is T;
/**
 * #isCallException
 * @param error
 * @returns
 */
declare function isCallException(error: any): error is CallExceptionError;
/**
 * #getTransactionError
 * @param tx
 * @param receipt
 * @param provider
 * @returns
 */
declare const getTransactionError: (tx: TransactionResponse, receipt: TransactionReceipt, provider: Provider) => Promise<string>;
/**
 * @export parseReasonCode
 * @param messageData
 * @returns
 */
declare const parseReasonCode: (messageData: string) => string;

/**
@export stderrors
github.com/WalletConnect/walletconnect-utils/blob/master/jsonrpc/utils/src/constants.ts
*/
declare const PARSE_ERROR = "PARSE_ERROR";
declare const INVALID_REQUEST = "INVALID_REQUEST";
declare const METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
declare const INVALID_PARAMS = "INVALID_PARAMS";
declare const INTERNAL_ERROR = "INTERNAL_ERROR";
declare const SERVER_ERROR = "SERVER_ERROR";
declare const RESERVED_ERROR_CODES: number[];
declare const SERVER_ERROR_CODE_RANGE: number[];
declare const STANDARD_ERROR_MAP: {
    PARSE_ERROR: {
        code: number;
        message: string;
    };
    INVALID_REQUEST: {
        code: number;
        message: string;
    };
    METHOD_NOT_FOUND: {
        code: number;
        message: string;
    };
    INVALID_PARAMS: {
        code: number;
        message: string;
    };
    INTERNAL_ERROR: {
        code: number;
        message: string;
    };
    SERVER_ERROR: {
        code: number;
        message: string;
    };
};

export { AddChainError, AddressZero, BURN_ADDRESS, BadDataError, BlockSpecifier, BufferOverrunError, CallExceptionError, ChainId, ChainNotConfiguredError, CodedEthersError, ConnectorAlreadyConnectedError, ConnectorNotFoundError, DeadAddress, EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA, ErrorAccessList, ErrorCode, ErrorFetchRequest, ErrorFetchRequestWithBody, ErrorFetchResponse, ErrorFetchResponseWithBody, ErrorSignature, ErrorTransaction, EthersError, HttpJsonRpcError, IJsonRpcError, IJsonRpcRequest, IJsonRpcResponse, IJsonRpcSuccess, INTERNAL_ERROR, INVALID_PARAMS, INVALID_REQUEST, InsufficientFundsError, InvalidArgumentError, JsonRpcError, JsonRpcMethod, JsonRpcPayload, JsonRpcRequest, JsonRpcResponse, MAINNET_RPC_URL, METHOD_NOT_FOUND, MissingArgumentError, NetworkError, NonceExpiredError, NotImplementedError, NumericFaultError, OPENMEV_METAMASK_CHAIN_ID, OPENMEV_METAMASK_SUPPORTED_NETWORKS, OPENMEV_SUPPORTED_NETWORKS, OffchainFaultError, PARSE_ERROR, privateTransaction as PrivateTransaction, PrivateTxState, PrivateTxStatus, ProviderRpcError, RESERVED_ERROR_CODES, reducer as Reducer, RegularizedBlockSpecifier, RelayResponse, RelayResponses, ReplacementUnderpricedError, ResourceUnavailableError, RpcError, SERVER_ERROR, SERVER_ERROR_CODE_RANGE, STANDARD_ERROR_MAP, SerializableTransactionReceipt, ServerError, SwitchChainError, SwitchChainNotSupportedError, TimeoutError, TransactionDetails$1 as TransactionDetails, TransactionReplacedError, UnconfiguredNameError, UnexpectedArgumentError, UnknownError, UnpredictableGasLimitError, UnsupportedOperationError, UserRejectedRequestError, addTransaction, checkedTransaction, clearAllTransactions, fetchJsonRpc, finalizeTransaction, getTransactionError, isCallException, isError, isJsonRpcError, isJsonRpcSuccess, isTxExpired, isTxIndeterminate, isTxPending, isTxSuccessful, parseReasonCode, privateTx, txMinutesPending, updatePrivateTxStatus, validateJsonRpcResponse };
