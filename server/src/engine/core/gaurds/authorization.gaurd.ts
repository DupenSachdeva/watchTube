import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { jwtService } from '../services/jwt.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService:jwtService) {}
  
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      let token = request.headers.authorization as string;
      console.log(token);
      
      if (!token) throw new UnauthorizedException();
  
      console.log("here");
      
      const data = this.jwtService.decode(token);
      
      if(data.userId){
        request.userId = data.userId
        console.log("near true");
        
        return true;}
      
      
      request.userId = data.userId
      console.log("nnear false");
      
      return false;
    }
  }
  