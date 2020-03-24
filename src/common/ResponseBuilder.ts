import * as Hapi from '@hapi/hapi';

export default class ResponseBuilder {
    statusCode: number;
    message: string;
    status: boolean;
    error: string;
    data: any;

    constructor(statusCode = 200, status = true, message = 'Success', error = null, data = null) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.error = error;
        this.data = data;
    }

    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    setStatus(status) {
        this.status = status;
        return this;
    }

    setError(error) {
        this.statusCode = error.statusCode || 500;
        this.status = false;
        this.message = error.message;
        this.error = error.constructor.name;
        return this
    }

    setData(data) {
        this.data = data;
        return this
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    toString() {
        let response: Hapi.ResponseToolkit;
        response.response(this).code(this.statusCode)
        return JSON.stringify(response)
    }
}