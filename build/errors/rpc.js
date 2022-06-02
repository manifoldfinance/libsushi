/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
export class RpcError extends Error {
    constructor(
    /** Number error code */
    code, 
    /** Human-readable string */
    message, 
    /** Low-level error */
    internal, 
    /** Other useful information about error */
    data) {
        if (!Number.isInteger(code))
            throw new Error('"code" must be an integer.');
        if (!message || typeof message !== 'string')
            throw new Error('"message" must be a nonempty string.');
        super(message);
        this.code = code;
        this.data = data;
        this.internal = internal;
    }
}
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
export class ProviderRpcError extends RpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(
    /**
     * Number error code
     * @see https://eips.ethereum.org/EIPS/eip-1193#error-standards
     */
    code, 
    /** Human-readable string */
    message, 
    /** Low-level error */
    internal, 
    /** Other useful information about error */
    data) {
        if (!(Number.isInteger(code) && code >= 1000 && code <= 4999))
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        super(code, message, internal, data);
    }
}
export class AddChainError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'AddChainError';
        this.message = 'Error adding chain';
    }
}
export class ChainNotConfiguredError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ChainNotConfigured';
        this.message = 'Chain not configured';
    }
}
export class ConnectorAlreadyConnectedError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ConnectorAlreadyConnectedError';
        this.message = 'Connector already connected';
    }
}
export class ConnectorNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ConnectorNotFoundError';
        this.message = 'Connector not found';
    }
}
export class SwitchChainError extends ProviderRpcError {
    constructor(error) {
        super(4902, 'Error switching chain', error);
        this.name = 'SwitchChainError';
    }
}
export class SwitchChainNotSupportedError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'SwitchChainNotSupportedError';
        this.message = 'Switch chain not supported by connector';
    }
}
export class UserRejectedRequestError extends ProviderRpcError {
    constructor(error) {
        super(4001, 'User rejected request', error);
        this.name = 'UserRejectedRequestError';
    }
}
export class ResourceUnavailableError extends RpcError {
    constructor(error) {
        super(-32002, 'Resource unavailable', error);
        this.name = 'ResourceUnavailable';
    }
}
