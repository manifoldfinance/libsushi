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
export class HttpJsonRpcError extends Error {
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
export function fetchJsonRpc(url, { jsonrpc = '2.0', id = new Date().getTime(), method = '', params = [] }) {
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
        console.log(res.json);
    });
}
export function validateJsonRpcResponse(response) {
    if (response.jsonrpc !== '2.0' ||
        (typeof response.id !== 'string' && typeof response.id !== 'number' && response.id !== null) ||
        ('result' in response && 'error' in response) ||
        (!('result' in response) && !('error' in response)) ||
        (response.error && typeof response.error.code !== 'number') ||
        (response.error && typeof response.error.message !== 'string'))
        throw new Error(`Expected JSON-RPC response, received something else.\n${JSON.stringify(response)}`);
    return true;
}
export function isJsonRpcSuccess(response) {
    return !!response.result && !response.error;
}
export function isJsonRpcError(response) {
    return !!response.error && !response.result;
}
