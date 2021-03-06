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

import { PrivateTxState } from './privateTransaction';
import { TransactionDetails } from './reducer';
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
export type BlockSpecifier = number | "genesis" | "latest" | "pending"

/** @export RegularizedBlockSpecifier */
export type RegularizedBlockSpecifier = number | "pending";

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
export function isTxPending(tx?: TransactionDetails): boolean {
  if (!tx?.privateTx) return !tx?.receipt;
  return tx?.privateTx?.state === PrivateTxState.UNCHECKED || tx?.privateTx?.state === PrivateTxState.PROCESSING;
}

/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export function isTxSuccessful(tx?: TransactionDetails): boolean {
  if (!tx?.privateTx) return !!tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');
  return (
    tx?.privateTx?.state === PrivateTxState.OK &&
    !!tx &&
    (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')
  );
}

/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export function isTxIndeterminate(tx?: TransactionDetails): boolean {
  if (!tx?.privateTx) return false;
  return tx?.privateTx?.state === PrivateTxState.INDETERMINATE;
}

/**
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {number}
 */
export function txMinutesPending(tx?: TransactionDetails): number {
  if (!tx) return 0;
  return (new Date().getTime() - tx.addedTime) / 1000 / 60;
}

/**
 *
 *
 * @export
 * @param {TransactionDetails} [tx]
 * @return {boolean}
 */
export function isTxExpired(tx?: TransactionDetails): boolean {
  if (!tx) return false;
  return txMinutesPending(tx) > 60;
}
