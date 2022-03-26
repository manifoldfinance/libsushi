import { PrivateTxState } from './OpenMevState';
export function isTxPending(tx) {
    if (!tx?.privateTx)
        return !tx?.receipt;
    return tx?.privateTx?.state === PrivateTxState.UNCHECKED || tx?.privateTx?.state === PrivateTxState.PROCESSING;
}
export function isTxSuccessful(tx) {
    if (!tx?.privateTx)
        return !!tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');
    return (tx?.privateTx?.state === PrivateTxState.OK &&
        !!tx &&
        (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined'));
}
export function isTxIndeterminate(tx) {
    if (!tx?.privateTx)
        return false;
    return tx?.privateTx?.state === PrivateTxState.INDETERMINATE;
}
export function txMinutesPending(tx) {
    if (!tx)
        return 0;
    return (new Date().getTime() - tx.addedTime) / 1000 / 60;
}
export function isTxExpired(tx) {
    if (!tx)
        return false;
    return txMinutesPending(tx) > 60;
}
//# sourceMappingURL=privateTransaction.js.map