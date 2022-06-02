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
export var PrivateTxState;
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
export function privateTx(privateTx) {
    throw new Error('[#sushiguard]: Function Error.');
}
