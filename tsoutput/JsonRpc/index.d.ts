export interface JsonRpcRequest {
    jsonrpc: '2.0';
    id: number | string | null;
    method: string;
    params?: unknown[] | unknown;
}
export interface JsonRpcError {
    code: number;
    message: string;
    data?: unknown;
}
export interface JsonRpcResponse<T> {
    jsonrpc: '2.0';
    id?: number | string | null;
    result?: T;
    error?: JsonRpcError;
}
export declare class HttpJsonRpcError extends Error {
    req?: JsonRpcRequest | undefined;
    res?: Response | undefined;
    constructor(message: string, req?: JsonRpcRequest | undefined, res?: Response | undefined);
}
export declare function fetchJsonRpc<T>(url: string, { jsonrpc, id, method, params }: Partial<JsonRpcRequest>): Promise<JsonRpcResponse<JsonRpcError | T>>;
