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
//# sourceMappingURL=index.js.map