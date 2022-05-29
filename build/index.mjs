import { createAction, createReducer } from '@reduxjs/toolkit';
import { toUtf8String } from '@ethersproject/strings';

var ChainId = /* @__PURE__ */ ((ChainId2) => {
  ChainId2["MAINNET"] = "1";
  return ChainId2;
})(ChainId || {});

const addTransaction = createAction("transactions/addTransaction");
const clearAllTransactions = createAction("transactions/clearAllTransactions");
const finalizeTransaction = createAction("transactions/finalizeTransaction");
const checkedTransaction = createAction("transactions/checkedTransaction");
const updatePrivateTxStatus = createAction("transactions/updatePrivateTxStatus");

var PrivateTxState = /* @__PURE__ */ ((PrivateTxState2) => {
  PrivateTxState2["UNCHECKED"] = "UNCHECKED";
  PrivateTxState2["PROCESSING"] = "PROCESSING";
  PrivateTxState2["OK"] = "OK";
  PrivateTxState2["INDETERMINATE"] = "INDETERMINATE";
  PrivateTxState2["ERROR"] = "ERROR";
  return PrivateTxState2;
})(PrivateTxState || {});
function privateTx(privateTx2) {
  throw new Error("[#sushiguard]: Function Error.");
}

var privateTransaction = /*#__PURE__*/Object.freeze({
  __proto__: null,
  PrivateTxState: PrivateTxState,
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
function isTxPending(tx) {
  if (!tx?.privateTx)
    return !tx?.receipt;
  return tx?.privateTx?.state === PrivateTxState.UNCHECKED || tx?.privateTx?.state === PrivateTxState.PROCESSING;
}
function isTxSuccessful(tx) {
  if (!tx?.privateTx)
    return !!tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === "undefined");
  return tx?.privateTx?.state === PrivateTxState.OK && !!tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === "undefined");
}
function isTxIndeterminate(tx) {
  if (!tx?.privateTx)
    return false;
  return tx?.privateTx?.state === PrivateTxState.INDETERMINATE;
}
function txMinutesPending(tx) {
  if (!tx)
    return 0;
  return (new Date().getTime() - tx.addedTime) / 1e3 / 60;
}
function isTxExpired(tx) {
  if (!tx)
    return false;
  return txMinutesPending(tx) > 60;
}

const now = () => new Date().getTime();
const initialState = {};
var reducer = createReducer(initialState, (builder) => builder.addCase(addTransaction, (transactions, { payload: { chainId, from, hash, approval, summary, claim, privateTx = false } }) => {
  if (transactions[chainId]?.[hash]) {
    throw Error("Attempted to add existing transaction.");
  }
  const txs = transactions[chainId] ?? {};
  txs[hash] = {
    hash,
    approval,
    summary,
    claim,
    from,
    addedTime: now(),
    ...privateTx ? { privateTx: { state: PrivateTxState.UNCHECKED, status: void 0 } } : {}
  };
  transactions[chainId] = txs;
}).addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
  if (!transactions[chainId])
    return;
  transactions[chainId] = {};
}).addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
  const tx = transactions[chainId]?.[hash];
  if (!tx) {
    return;
  }
  if (!tx.lastCheckedBlockNumber) {
    tx.lastCheckedBlockNumber = blockNumber;
  } else {
    tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
  }
}).addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
  const tx = transactions[chainId]?.[hash];
  if (!tx) {
    return;
  }
  tx.receipt = receipt;
  tx.confirmedTime = now();
}).addCase(updatePrivateTxStatus, (transactions, { payload: { chainId, hash, status } }) => {
  const tx = transactions[chainId]?.[hash];
  if (!tx)
    return;
  if (!tx.privateTx)
    throw new Error("Invalid update private tx call to a non private tx");
  const prevState = tx.privateTx?.state;
  tx.privateTx?.status;
  const minutesElapsed = txMinutesPending(tx);
  if (prevState && (prevState === PrivateTxState.ERROR || prevState === PrivateTxState.INDETERMINATE || prevState === PrivateTxState.OK))
    return;
  let state = PrivateTxState.PROCESSING;
  if (status.receivedAt && status.relayedAt && !status.relayFailure && status.minedAt)
    state = PrivateTxState.OK;
  if (status.receivedAt && status.relayFailure && status.relayResponses && Object.values(status.relayResponses).reduceRight((prev, current) => {
    if (prev)
      return prev;
    if (current.error || current.response.error)
      return true;
    return false;
  }, false))
    state = PrivateTxState.ERROR;
  if (status.receivedAt && status.relayedAt && status.relayFailure && status.minedAt)
    state = PrivateTxState.INDETERMINATE;
  if (minutesElapsed > 3)
    state = PrivateTxState.INDETERMINATE;
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
class HttpJsonRpcError extends Error {
  constructor(message, req, res) {
    super(message);
    this.req = req;
    this.res = res;
  }
}
function fetchJsonRpc(url, { jsonrpc = "2.0", id = new Date().getTime(), method = "", params = [] }) {
  return fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ jsonrpc, id, method, params })
  }).then((res) => {
    if (res.status !== 200)
      throw new HttpJsonRpcError(res.statusText, { jsonrpc, id, method, params }, res);
    return res.json();
  });
}
function validateJsonRpcResponse(response) {
  if (response.jsonrpc !== "2.0" || typeof response.id !== "string" && typeof response.id !== "number" && response.id !== null || "result" in response && "error" in response || !("result" in response) && !("error" in response) || response.error && typeof response.error.code !== "number" || response.error && typeof response.error.message !== "string")
    throw new Error(`Expected JSON-RPC response, received something else.
${JSON.stringify(response)}`);
  return true;
}
function isJsonRpcSuccess(response) {
  return !!response.result && !response.error;
}
function isJsonRpcError(response) {
  return !!response.error && !response.result;
}

const BURN_ADDRESS = 57005;

const AddressZero = "0x0000000000000000000000000000000000000000";

const EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA = "";

const DeadAddress = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000";

class RpcError extends Error {
  constructor(code, message, internal, data) {
    if (!Number.isInteger(code))
      throw new Error('"code" must be an integer.');
    if (!message || typeof message !== "string")
      throw new Error('"message" must be a nonempty string.');
    super(message);
    this.code = code;
    this.data = data;
    this.internal = internal;
  }
}
class ProviderRpcError extends RpcError {
  constructor(code, message, internal, data) {
    if (!(Number.isInteger(code) && code >= 1e3 && code <= 4999))
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
    super(code, message, internal, data);
  }
}
class AddChainError extends Error {
  constructor() {
    super(...arguments);
    this.name = "AddChainError";
    this.message = "Error adding chain";
  }
}
class ChainNotConfiguredError extends Error {
  constructor() {
    super(...arguments);
    this.name = "ChainNotConfigured";
    this.message = "Chain not configured";
  }
}
class ConnectorAlreadyConnectedError extends Error {
  constructor() {
    super(...arguments);
    this.name = "ConnectorAlreadyConnectedError";
    this.message = "Connector already connected";
  }
}
class ConnectorNotFoundError extends Error {
  constructor() {
    super(...arguments);
    this.name = "ConnectorNotFoundError";
    this.message = "Connector not found";
  }
}
class SwitchChainError extends ProviderRpcError {
  constructor(error) {
    super(4902, "Error switching chain", error);
    this.name = "SwitchChainError";
  }
}
class SwitchChainNotSupportedError extends Error {
  constructor() {
    super(...arguments);
    this.name = "SwitchChainNotSupportedError";
    this.message = "Switch chain not supported by connector";
  }
}
class UserRejectedRequestError extends ProviderRpcError {
  constructor(error) {
    super(4001, "User rejected request", error);
    this.name = "UserRejectedRequestError";
  }
}
class ResourceUnavailableError extends RpcError {
  constructor(error) {
    super(-32002, "Resource unavailable", error);
    this.name = "ResourceUnavailable";
  }
}

const getTransactionError = async (tx, receipt, provider) => {
  if (typeof tx !== "object") {
    throw TypeError(`tx argument ${tx} must be a transaction object`);
  }
  if (typeof receipt !== "object") {
    throw TypeError(`receipt argument ${receipt} must be a transaction receipt object`);
  }
  if (receipt.status) {
    throw TypeError("Transaction did not fail. Can only read the revert reason from failed transactions");
  }
  if (!receipt.transactionHash) {
    throw TypeError(`There is no transaction hash on the receipt object`);
  }
  if (receipt.gasUsed === tx.gasLimit) {
    throw Error("Transaction failed as it ran out of gas.");
  }
  let rawMessageData;
  try {
    const result = await provider.call({
      ...tx
    }, receipt.blockNumber);
    rawMessageData = result.slice(2);
  } catch (e) {
    if (e.message.startsWith("Node error: ")) {
      const errorObjectStr = e.message.slice(12);
      const errorObject = JSON.parse(errorObjectStr);
      if (!errorObject.data) {
        throw Error("Failed to parse data field error object:" + errorObjectStr);
      }
      if (errorObject.data.startsWith("Reverted 0x")) {
        rawMessageData = errorObject.data.slice(11);
      } else if (errorObject.data.startsWith("0x")) {
        rawMessageData = errorObject.data.slice(2);
      } else {
        throw Error("Failed to parse data field of error object:" + errorObjectStr);
      }
    } else {
      throw Error("Failed to parse error message from Ethereum call: " + e.message);
    }
  }
  return parseReasonCode(rawMessageData);
};
const parseReasonCode = (messageData) => {
  const strLen = parseInt(messageData.slice(8 + 64, 8 + 128), 16);
  const reasonCodeHex = messageData.slice(8 + 128, 8 + 128 + strLen * 2);
  const reason = toUtf8String("0x" + reasonCodeHex);
  return reason;
};

export { AddChainError, AddressZero, BURN_ADDRESS, ChainId, ChainNotConfiguredError, ConnectorAlreadyConnectedError, ConnectorNotFoundError, DeadAddress, EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA, HttpJsonRpcError, privateTransaction as PrivateTransaction, PrivateTxState, ProviderRpcError, reducer$1 as Reducer, ResourceUnavailableError, RpcError, SwitchChainError, SwitchChainNotSupportedError, UserRejectedRequestError, addTransaction, checkedTransaction, clearAllTransactions, fetchJsonRpc, finalizeTransaction, getTransactionError, isJsonRpcError, isJsonRpcSuccess, isTxExpired, isTxIndeterminate, isTxPending, isTxSuccessful, parseReasonCode, privateTx, txMinutesPending, updatePrivateTxStatus, validateJsonRpcResponse };
//# sourceMappingURL=index.mjs.map
