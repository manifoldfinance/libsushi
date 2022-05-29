import { createAction, createReducer } from '@reduxjs/toolkit';
import { toUtf8String } from '@ethersproject/strings';

/** @export ChainId */
var ChainId;
(function (ChainId) {
    ChainId["MAINNET"] = "1";
})(ChainId || (ChainId = {}));

/**
 * @filename Redux Action
 * @version 0.2.0
 */
const addTransaction = createAction('transactions/addTransaction');
const clearAllTransactions = createAction('transactions/clearAllTransactions');
const finalizeTransaction = createAction('transactions/finalizeTransaction');
const checkedTransaction = createAction('transactions/checkedTransaction');
const updatePrivateTxStatus = createAction('transactions/updatePrivateTxStatus');

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
var PrivateTxState;
(function (PrivateTxState) {
    PrivateTxState["UNCHECKED"] = "UNCHECKED";
    PrivateTxState["PROCESSING"] = "PROCESSING";
    PrivateTxState["OK"] = "OK";
    PrivateTxState["INDETERMINATE"] = "INDETERMINATE";
    PrivateTxState["ERROR"] = "ERROR";
})(PrivateTxState || (PrivateTxState = {}));
/**
 *
 *
 * @export
 * @param {*} privateTx
 * @return {*}
 */
function privateTx(privateTx) {
    throw new Error('[#sushiguard]: Function Error.');
}

var privateTransaction = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get PrivateTxState () { return PrivateTxState; },
  privateTx: privateTx
});

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
function isTxPending(tx) {
    if (!tx?.privateTx)
        return !tx?.receipt;
    return tx?.privateTx?.state === PrivateTxState.UNCHECKED || tx?.privateTx?.state === PrivateTxState.PROCESSING;
}
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
function isTxSuccessful(tx) {
    if (!tx?.privateTx)
        return !!tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');
    return (tx?.privateTx?.state === PrivateTxState.OK &&
        !!tx &&
        (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined'));
}
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
function isTxIndeterminate(tx) {
    if (!tx?.privateTx)
        return false;
    return tx?.privateTx?.state === PrivateTxState.INDETERMINATE;
}
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {number}
 */
function txMinutesPending(tx) {
    if (!tx)
        return 0;
    return (new Date().getTime() - tx.addedTime) / 1000 / 60;
}
/**
 *
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
function isTxExpired(tx) {
    if (!tx)
        return false;
    return txMinutesPending(tx) > 60;
}

/**
 *
 * @filename Redux Reducer
 *
 */
const now = () => new Date().getTime();
const initialState = {};
var reducer = createReducer(initialState, (builder) => builder
    .addCase(addTransaction, 
// @ts-expect-error
(transactions, { payload: { chainId, from, hash, approval, summary, claim, privateTx = false } }) => {
    if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.');
    }
    const txs = transactions[chainId] ?? {};
    txs[hash] = {
        hash,
        approval,
        summary,
        claim,
        from,
        addedTime: now(),
        ...(privateTx ? { privateTx: { state: PrivateTxState.UNCHECKED, status: undefined } } : {}),
    };
    transactions[chainId] = txs;
})
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
    if (!transactions[chainId])
        return;
    transactions[chainId] = {};
})
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
    const tx = transactions[chainId]?.[hash];
    if (!tx) {
        return;
    }
    if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
    }
    else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
    }
})
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
    const tx = transactions[chainId]?.[hash];
    if (!tx) {
        return;
    }
    tx.receipt = receipt;
    tx.confirmedTime = now();
})
    .addCase(updatePrivateTxStatus, (transactions, { payload: { chainId, hash, status } }) => {
    const tx = transactions[chainId]?.[hash];
    if (!tx)
        return;
    if (!tx.privateTx)
        throw new Error('Invalid update private tx call to a non private tx');
    const prevState = tx.privateTx?.state;
    tx.privateTx?.status;
    const minutesElapsed = txMinutesPending(tx);
    // If previous state was a definitive one, we skip processing new events
    if (prevState &&
        (prevState === PrivateTxState.ERROR ||
            prevState === PrivateTxState.INDETERMINATE ||
            prevState === PrivateTxState.OK))
        return;
    // derive new private tx state from latest received status
    let state = PrivateTxState.PROCESSING;
    // OK - Relay received the Tx && all downstream miners accepted without complains && tx mined successfully
    if (status.receivedAt && status.relayedAt && !status.relayFailure && status.minedAt)
        state = PrivateTxState.OK;
    // ERROR
    if (status.receivedAt &&
        status.relayFailure &&
        status.relayResponses &&
        Object.values(status.relayResponses).reduceRight((prev, current) => {
            if (prev)
                return prev;
            if (current.error || current.response.error)
                return true;
            return false;
        }, false))
        state = PrivateTxState.ERROR;
    // INDETERMINATE
    if (status.receivedAt && status.relayedAt && status.relayFailure && status.minedAt)
        state = PrivateTxState.INDETERMINATE;
    // If more than 20 minutes has passed, better to mark this TX as indeterminate
    if (minutesElapsed > 3)
        state = PrivateTxState.INDETERMINATE;
    // update new state
    tx.privateTx.state = state ?? PrivateTxState.UNCHECKED;
    tx.privateTx.status = status;
}));

var reducer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  initialState: initialState,
  'default': reducer
});

/**
 * @file JsonRpc
 * @version 0.3.0
 * @license Apache-2.0
 *
 */
/**
 * @export
 * @class HttpJsonRpcError
 * @extends {Error}
 */
class HttpJsonRpcError extends Error {
    constructor(message, req, res) {
        super(message);
        this.req = req;
        this.res = res;
    }
}
/**
 * @export
 * @template T
 * @param {string} url
 * @param {Partial<JsonRpcRequest>} {
 * @return {(Promise<JsonRpcResponse<JsonRpcError | T>>)}
 */
function fetchJsonRpc(url, { jsonrpc = '2.0', id = new Date().getTime(), method = '', params = [] }) {
    return fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ jsonrpc, id, method, params }),
    }).then((res) => {
        // handle http errors (anything not 200)
        if (res.status !== 200)
            throw new HttpJsonRpcError(res.statusText, { jsonrpc, id, method, params }, res);
        // handle successful response
        return res.json();
    });
}
function validateJsonRpcResponse(response) {
    if (response.jsonrpc !== '2.0' ||
        (typeof response.id !== 'string' && typeof response.id !== 'number' && response.id !== null) ||
        ('result' in response && 'error' in response) ||
        (!('result' in response) && !('error' in response)) ||
        (response.error && typeof response.error.code !== 'number') ||
        (response.error && typeof response.error.message !== 'string'))
        throw new Error(`Expected JSON-RPC response, received something else.\n${JSON.stringify(response)}`);
    return true;
}
function isJsonRpcSuccess(response) {
    return !!response.result && !response.error;
}
function isJsonRpcError(response) {
    return !!response.error && !response.result;
}

const BURN_ADDRESS = '0x000000000000000000000000000000000000dead';

const AddressZero = '0x0000000000000000000000000000000000000000';

const EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA = `\x19\x01`;

// @note this is also the old OVM_ETH address on Optimism
const DeadAddress = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';

/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
class RpcError extends Error {
    constructor(
    /** Number error code */
    code, 
    /** Human-readable string */
    message, 
    /** Low-level error */
    internal, 
    /** Other useful information about error */
    data) {
        if (!Number.isInteger(code))
            throw new Error('"code" must be an integer.');
        if (!message || typeof message !== 'string')
            throw new Error('"message" must be a nonempty string.');
        super(message);
        this.code = code;
        this.data = data;
        this.internal = internal;
    }
}
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
class ProviderRpcError extends RpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(
    /**
     * Number error code
     * @see https://eips.ethereum.org/EIPS/eip-1193#error-standards
     */
    code, 
    /** Human-readable string */
    message, 
    /** Low-level error */
    internal, 
    /** Other useful information about error */
    data) {
        if (!(Number.isInteger(code) && code >= 1000 && code <= 4999))
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        super(code, message, internal, data);
    }
}
class AddChainError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'AddChainError';
        this.message = 'Error adding chain';
    }
}
class ChainNotConfiguredError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ChainNotConfigured';
        this.message = 'Chain not configured';
    }
}
class ConnectorAlreadyConnectedError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ConnectorAlreadyConnectedError';
        this.message = 'Connector already connected';
    }
}
class ConnectorNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ConnectorNotFoundError';
        this.message = 'Connector not found';
    }
}
class SwitchChainError extends ProviderRpcError {
    constructor(error) {
        super(4902, 'Error switching chain', error);
        this.name = 'SwitchChainError';
    }
}
class SwitchChainNotSupportedError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'SwitchChainNotSupportedError';
        this.message = 'Switch chain not supported by connector';
    }
}
class UserRejectedRequestError extends ProviderRpcError {
    constructor(error) {
        super(4001, 'User rejected request', error);
        this.name = 'UserRejectedRequestError';
    }
}
class ResourceUnavailableError extends RpcError {
    constructor(error) {
        super(-32002, 'Resource unavailable', error);
        this.name = 'ResourceUnavailable';
    }
}

/**
 * #isError
 * @param error
 * @param code
 * @returns
 */
function isError(error, code) {
    return error && error.code === code;
}
/**
 * #isCallException
 * @param error
 * @returns
 */
function isCallException(error) {
    return isError(error, 'CALL_EXCEPTION');
}
/**
 * #getTransactionError
 * @param tx
 * @param receipt
 * @param provider
 * @returns
 */
const getTransactionError = async (tx, receipt, provider) => {
    if (typeof tx !== 'object') {
        throw TypeError(`tx argument ${tx} must be a transaction object`);
    }
    if (typeof receipt !== 'object') {
        throw TypeError(`receipt argument ${receipt} must be a transaction receipt object`);
    }
    if (receipt.status) {
        throw TypeError('Transaction did not fail. Can only read the revert reason from failed transactions');
    }
    if (!receipt.transactionHash) {
        throw TypeError(`There is no transaction hash on the receipt object`);
    }
    if (receipt.gasUsed === tx.gasLimit) {
        throw Error('Transaction failed as it ran out of gas.');
    }
    // TODO: check type
    let rawMessageData;
    try {
        const result = await provider.call({
            ...tx,
        }, receipt.blockNumber);
        // @dev Trim the 0x prefix
        rawMessageData = result.slice(2);
    }
    catch (e) {
        if (e.message.startsWith('Node error: ')) {
            // @dev  Trim "Node error: "
            const errorObjectStr = e.message.slice(12);
            // @dev Parse the error object
            const errorObject = JSON.parse(errorObjectStr);
            if (!errorObject.data) {
                throw Error('Failed to parse data field error object:' + errorObjectStr);
            }
            if (errorObject.data.startsWith('Reverted 0x')) {
                // Trim "Reverted 0x" from the data field
                rawMessageData = errorObject.data.slice(11);
            }
            else if (errorObject.data.startsWith('0x')) {
                // Trim "0x" from the data field
                rawMessageData = errorObject.data.slice(2);
            }
            else {
                throw Error('Failed to parse data field of error object:' + errorObjectStr);
            }
        }
        else {
            throw Error('Failed to parse error message from Ethereum call: ' + e.message);
        }
    }
    return parseReasonCode(rawMessageData);
};
/**
 * @export parseReasonCode
 * @param messageData
 * @returns
 */
const parseReasonCode = (messageData) => {
    // Get the length of the revert reason
    const strLen = parseInt(messageData.slice(8 + 64, 8 + 128), 16);
    // Using the length and known offset, extract and convert the revert reason
    const reasonCodeHex = messageData.slice(8 + 128, 8 + 128 + strLen * 2);
    // Convert reason from hex to string
    const reason = toUtf8String('0x' + reasonCodeHex);
    return reason;
};

export { AddChainError, AddressZero, BURN_ADDRESS, ChainId, ChainNotConfiguredError, ConnectorAlreadyConnectedError, ConnectorNotFoundError, DeadAddress, EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA, HttpJsonRpcError, privateTransaction as PrivateTransaction, PrivateTxState, ProviderRpcError, reducer$1 as Reducer, ResourceUnavailableError, RpcError, SwitchChainError, SwitchChainNotSupportedError, UserRejectedRequestError, addTransaction, checkedTransaction, clearAllTransactions, fetchJsonRpc, finalizeTransaction, getTransactionError, isCallException, isError, isJsonRpcError, isJsonRpcSuccess, isTxExpired, isTxIndeterminate, isTxPending, isTxSuccessful, parseReasonCode, privateTx, txMinutesPending, updatePrivateTxStatus, validateJsonRpcResponse };
//# sourceMappingURL=index.mjs.map
