'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

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

/**
 * @file index.ts
 * @version 0.1.0
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

var ChainId = /* @__PURE__ */ ((ChainId2) => {
  ChainId2["MAINNET"] = "1";
  return ChainId2;
})(ChainId || {});

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

const addTransaction = toolkit.createAction("transactions/addTransaction");
const clearAllTransactions = toolkit.createAction("transactions/clearAllTransactions");
const finalizeTransaction = toolkit.createAction("transactions/finalizeTransaction");
const checkedTransaction = toolkit.createAction("transactions/checkedTransaction");
const updatePrivateTxStatus = toolkit.createAction("transactions/updatePrivateTxStatus");

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

var privateTransaction = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isTxPending: isTxPending,
  isTxSuccessful: isTxSuccessful,
  isTxIndeterminate: isTxIndeterminate,
  txMinutesPending: txMinutesPending,
  isTxExpired: isTxExpired
});

exports.ChainId = ChainId;
exports.HttpJsonRpcError = HttpJsonRpcError;
exports.PrivateTransaction = privateTransaction;
exports.PrivateTxState = PrivateTxState;
exports.addTransaction = addTransaction;
exports.checkedTransaction = checkedTransaction;
exports.clearAllTransactions = clearAllTransactions;
exports.fetchJsonRpc = fetchJsonRpc;
exports.finalizeTransaction = finalizeTransaction;
exports.isJsonRpcError = isJsonRpcError;
exports.isJsonRpcSuccess = isJsonRpcSuccess;
exports.isTxExpired = isTxExpired;
exports.isTxIndeterminate = isTxIndeterminate;
exports.isTxPending = isTxPending;
exports.isTxSuccessful = isTxSuccessful;
exports.privateTx = privateTx;
exports.txMinutesPending = txMinutesPending;
exports.updatePrivateTxStatus = updatePrivateTxStatus;
exports.validateJsonRpcResponse = validateJsonRpcResponse;
//# sourceMappingURL=index.js.map
