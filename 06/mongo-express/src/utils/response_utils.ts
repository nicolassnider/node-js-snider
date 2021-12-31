import { Response } from "express"
import { Types, mongo } from "mongoose";

const{ObjectId} = Types;
const{MongoError}= mongo;

export const validateObjectId=(id:string)=>{
    if(!Types.ObjectId.isValid(id)){
        throw {code:400,message:`Invalid objectId ${id}`};
        
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sendError=(res:Response,e:any)=>{

    if(e instanceof MongoError){
        res.status(400).send({
            code:e.code,
            message:e.code===11000?'Duplicated value':'error',
        });
        return;
    }
    const statusCode:number = e.code||500;
    res.status(statusCode).send(e.message);
}