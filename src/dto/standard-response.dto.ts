export class StandardResponseDto {
    status: string;
    statuscode: number;
    message: string;
    data?: Object;

    constructor(status:string,statuscode:number,message:string,data?:Object) { 
        this.status = status;
        this.statuscode = statuscode;
        this.message = message;
        if(data) this.data = data;
    }
}

