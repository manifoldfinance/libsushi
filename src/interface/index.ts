/**
 *
 * @package InterfaceJsonRpc
 * @since 2022.03
 * @version 01.0
 *
 */

/* prettier-ignore */
export type JsonRpcMethod = 'eth_accounts' | 'eth_blockNumber' | 'eth_call' | 'eth_chainId' | 'eth_coinbase' | 'eth_estimateGas' | 'eth_gasPrice' | 'eth_getBalance' | 'eth_getBlockByHash' | 'eth_getBlockByNumber' | 'eth_getBlockTransactionCountByHash' | 'eth_getBlockTransactionCountByNumber' | 'eth_getCode' | 'eth_getLogs' | 'eth_getProof' | 'eth_getStorageAt' | 'eth_getTransactionByBlockHashAndIndex' | 'eth_getTransactionByBlockNumberAndIndex' | 'eth_getTransactionByHash' | 'eth_getTransactionCount' | 'eth_getTransactionReceipt' | 'eth_getUncleByBlockHashAndIndex' | 'eth_getUncleByBlockNumberAndIndex' | 'eth_getUncleCountByBlockHash' | 'eth_getUncleCountByBlockNumber' | 'eth_protocolVersion' | 'eth_sendRawTransaction' | 'eth_sendTransaction' | 'eth_sign' | 'eth_signTransaction' | 'eth_signTypedData' | 'eth_syncing'

/**
 *
 * @export
 * @interface IJsonRpcRequest
 * @template TMethod
 * @template TParams
 */
export interface IJsonRpcRequest<TMethod extends JsonRpcMethod, TParams extends Array<unknown>> {
  readonly jsonrpc: '2.0';
  readonly id: string | number | null;
  readonly method: TMethod;
  readonly params: TParams;
}

/**
 *
 *
 * @export
 * @interface IJsonRpcSuccess
 * @template TResult
 */
export interface IJsonRpcSuccess<TResult> {
  readonly jsonrpc: '2.0';
  readonly id: string | number | null;
  readonly result: TResult;
}

/**
 *
 *
 * @export
 * @interface IJsonRpcError
 */
export interface IJsonRpcError {
  readonly jsonrpc: '2.0';
  readonly id: string | number | null;
  readonly error: {
    readonly code: number;
    readonly message: string;
    readonly data?: unknown;
  };
}

export type IJsonRpcResponse<T> = IJsonRpcSuccess<T> | IJsonRpcError;
export function validateJsonRpcResponse<T>(response: any): response is IJsonRpcResponse<T> {
  if (
    response.jsonrpc !== '2.0' ||
    (typeof response.id !== 'string' && typeof response.id !== 'number' && response.id !== null) ||
    ('result' in response && 'error' in response) ||
    (!('result' in response) && !('error' in response)) ||
    (response.error && typeof response.error.code !== 'number') ||
    (response.error && typeof response.error.message !== 'string')
  )
    throw new Error(`Expected JSON-RPC response, received something else.\n${JSON.stringify(response)}`);
  return true;
}


// TODO - Replace with JsonRpc Response type ok() and error()
/**
 * @export
 * @template T
 * @param {IJsonRpcResponse<T>} response
 * @return {response is IJsonRpcSuccess<T>}
 */
export function isJsonRpcSuccess<T>(response: IJsonRpcResponse<T>): response is IJsonRpcSuccess<T> {
  return !!(response as IJsonRpcSuccess<T>).result && !(response as IJsonRpcError).error;
}

/**
 *
 *
 * @export
 * @template T
 * @param {IJsonRpcResponse<T>} response
 * @return {response is IJsonRpcError}
 */

export function isJsonRpcError<T>(response: IJsonRpcResponse<T>): response is IJsonRpcError {
  return !!(response as IJsonRpcError).error && !(response as IJsonRpcSuccess<T>).result;
}
