export class CustomError extends Error {
    name:string;
    statusCode:Number;

    constructor(message = 'Custom error') {
        super(message);
        console.log(this.constructor.name);
        this.name = this.constructor.name;
        this.statusCode = 403
    }
}