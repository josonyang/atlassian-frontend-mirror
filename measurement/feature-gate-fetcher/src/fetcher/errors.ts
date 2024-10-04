export class ResponseError extends Error {
	private readonly _status: number;
	private readonly _body: string;
	constructor(message: string, status: number, body: string) {
		super(message);
		this._status = status;
		this._body = body;
	}

	get status() {
		return this._status;
	}

	get body() {
		return this._body;
	}
}
