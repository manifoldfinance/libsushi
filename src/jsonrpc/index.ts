export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: number | string | null;
  method: string;
  params?: unknown[] | unknown;
}

/**
 * @export
 * @interface JsonRpcError
 */
export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

/**
 * @export
 * @interface JsonRpcResponse
 * @template T
 */
export interface JsonRpcResponse<T> {
  jsonrpc: '2.0';
  id?: number | string | null;
  result?: T;
  error?: JsonRpcError;
}

/**
 * @export
 * @interface JsonRpcPayload
 */
export interface JsonRpcPayload {
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
export class HttpJsonRpcError extends Error {
  constructor(message: string, public req?: JsonRpcRequest, public res?: Response) {
    super(message);
  }
}

/**
 * @export
 * @template T
 * @param {string} url
 * @param {Partial<JsonRpcRequest>} {
 * @return {(Promise<JsonRpcResponse<JsonRpcError | T>>)}
 */
export function fetchJsonRpc<T>(
  url: string,
  { jsonrpc = '2.0', id = new Date().getTime(), method = '', params = [] }: Partial<JsonRpcRequest>,
): Promise<JsonRpcResponse<JsonRpcError | T>> {
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ jsonrpc, id, method, params }),
  }).then((res: Response) => {
    // handle http errors (anything not 200)
    if (res.status !== 200) throw new HttpJsonRpcError(res.statusText, { jsonrpc, id, method, params }, res);

    // handle successful response
    return res.json();
  });
}

export type JsonRpcMethod =
  | 'eth_accounts'
  | 'eth_blockNumber'
  | 'eth_call'
  | 'eth_chainId'
  | 'eth_coinbase'
  | 'eth_estimateGas'
  | 'eth_gasPrice'
  | 'eth_getBalance'
  | 'eth_getCode'
  | 'eth_getLogs'
  | 'eth_getProof'
  | 'eth_getStorageAt'
  | 'eth_getBlockByHash'
  | 'eth_getBlockByNumber'
  | 'eth_getBlockTransactionCountByHash'
  | 'eth_getBlockTransactionCountByNumber'
  | 'eth_getTransactionByBlockHashAndIndex'
  | 'eth_getTransactionByBlockNumberAndIndex'
  | 'eth_getTransactionByHash'
  | 'eth_getTransactionCount'
  | 'eth_getTransactionReceipt'
  | 'eth_getUncleByBlockHashAndIndex'
  | 'eth_getUncleByBlockNumberAndIndex'
  | 'eth_getUncleCountByBlockHash'
  | 'eth_getUncleCountByBlockNumber'
  | 'eth_protocolVersion'
  | 'eth_sendRawTransaction'
  | 'eth_sendTransaction'
  | 'eth_sign'
  | 'eth_signTransaction'
  | 'eth_signTypedData'
  | 'web3_clientVersion';
  | 'net_version';

export interface IJsonRpcRequest<TMethod extends JsonRpcMethod, TParams extends Array<unknown>> {
  readonly jsonrpc: '2.0';
  readonly id: string | number | null;
  readonly method: TMethod;
  readonly params: TParams;
}
export interface IJsonRpcSuccess<TResult> {
  readonly jsonrpc: '2.0';
  readonly id: string | number | null;
  readonly result: TResult;
}
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
export function isJsonRpcSuccess<T>(response: IJsonRpcResponse<T>): response is IJsonRpcSuccess<T> {
  return !!(response as IJsonRpcSuccess<T>).result && !(response as IJsonRpcError).error;
}
export function isJsonRpcError<T>(response: IJsonRpcResponse<T>): response is IJsonRpcError {
  return !!(response as IJsonRpcError).error && !(response as IJsonRpcSuccess<T>).result;
}
