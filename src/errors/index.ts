export * from './rpc';
export * from './transaction';
export * from './stdErrors';

/** @class ErrorHandler */
export class ErrorHandler {
	// @dev surface the error in the UI somewhere, perhaps an error toast
	public readonly noticeError = (error: any) => {
		if (error instanceof Error) {
			console.error(error)
		} else if (typeof error === 'string') {
			console.error(error)
		} else {
			console.error(error)
		}
	}

  /** @public asyncWrapper */
	public readonly asyncWrapper = <R, P extends any[]>(asyncFunction: (...args: P) => Promise<R>): (...args: P) => void => {
		return (...args: P) => asyncFunction(...args).catch(this.noticeError)
	}
}

/** @class JsonRpcError */
export class JsonRpcError extends Error {
	constructor(public readonly code: number, message: string, public readonly data?: object) {
		super(message)
		this.name = this.constructor.name
	}
}
