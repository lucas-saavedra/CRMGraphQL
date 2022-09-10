class CustomError {
    constructor(status, message) {
        this.message = message;
        this.status = status || 500;
    }
}

export default CustomError;