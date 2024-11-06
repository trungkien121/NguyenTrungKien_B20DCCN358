export class DataResponse {
    status: string;
    message: string;
    responseData: Object;
    constructor(status: string, message: string, responseData: Object) {
        this.status = status;
        this.message = message;
        this.responseData = responseData;
    }
}
