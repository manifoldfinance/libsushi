export class HttpJsonRpcError extends Error {
    constructor(message, req, res) {
        super(message);
        this.req = req;
        this.res = res;
    }
}
export function fetchJsonRpc(url, { jsonrpc = '2.0', id = new Date().getTime(), method = '', params = [] }) {
    return fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ jsonrpc, id, method, params }),
    }).then((res) => {
        if (res.status !== 200)
            throw new HttpJsonRpcError(res.statusText, { jsonrpc, id, method, params }, res);
        return res.json();
    });
}
//# sourceMappingURL=index.js.map