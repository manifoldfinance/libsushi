export declare type JsonRpcMethod = 'eth_accounts' | 'eth_blockNumber' | 'eth_call' | 'eth_chainId' | 'eth_coinbase' | 'eth_estimateGas' | 'eth_gasPrice' | 'eth_getBalance' | 'eth_getBlockByHash' | 'eth_getBlockByNumber' | 'eth_getBlockTransactionCountByHash' | 'eth_getBlockTransactionCountByNumber' | 'eth_getCode' | 'eth_getLogs' | 'eth_getProof' | 'eth_getStorageAt' | 'eth_getTransactionByBlockHashAndIndex' | 'eth_getTransactionByBlockNumberAndIndex' | 'eth_getTransactionByHash' | 'eth_getTransactionCount' | 'eth_getTransactionReceipt' | 'eth_getUncleByBlockHashAndIndex' | 'eth_getUncleByBlockNumberAndIndex' | 'eth_getUncleCountByBlockHash' | 'eth_getUncleCountByBlockNumber' | 'eth_protocolVersion' | 'eth_sendRawTransaction' | 'eth_sendTransaction' | 'eth_sign' | 'eth_signTransaction' | 'eth_signTypedData' | 'eth_syncing';
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
export declare type IJsonRpcResponse<T> = IJsonRpcSuccess<T> | IJsonRpcError;
export declare function validateJsonRpcResponse<T>(response: any): response is IJsonRpcResponse<T>;
export declare function isJsonRpcSuccess<T>(response: IJsonRpcResponse<T>): response is IJsonRpcSuccess<T>;
export declare function isJsonRpcError<T>(response: IJsonRpcResponse<T>): response is IJsonRpcError;
