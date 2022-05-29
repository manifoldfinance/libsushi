/**
 *
 * @class PrivateTransaction
 * @license GPL-3.0-Only
 * @see {@link https://docs.manifoldfinance.com}
 * @since 2022.03
 * @version 0.1.0
 *
 */
import { TransactionDetails } from './reducer';
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
export declare function isTxPending(tx?: TransactionDetails): boolean;
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export declare function isTxSuccessful(tx?: TransactionDetails): boolean;
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export declare function isTxIndeterminate(tx?: TransactionDetails): boolean;
/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {number}
 */
export declare function txMinutesPending(tx?: TransactionDetails): number;
/**
 *
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export declare function isTxExpired(tx?: TransactionDetails): boolean;
