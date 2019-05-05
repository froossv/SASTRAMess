export class User {
   username: number;
   password: number;
   hostel: string;
   constructor(values: Object = {}) {
        Object.assign(this, values);
   }
}

export class Response {
    Status: string;
    Text: string;
    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}
