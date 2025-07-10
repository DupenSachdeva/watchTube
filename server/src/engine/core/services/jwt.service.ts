import { verify } from "jsonwebtoken";
import { jwtDecodedData } from "../../types/jwt.type";

export class jwtService{
    decode(token:string){
        const data = verify(token,"tt") as jwtDecodedData
        console.log(data);
        
        return data;
    }
}