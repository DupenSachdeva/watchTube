import { Body, Controller, Post, Req } from "@nestjs/common";
import { authService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "src/engine/types/authDto";
import { dot } from "node:test/reporters";

@Controller('auth')
export class authController{
     constructor(private authService:authService){

        
     }

     @Post('signup')
     Signup(@Body() dto:AuthDto){
            return this.authService.Signup(dto)
     }

     @Post('signin')
     Signin(@Body() dto:AuthDto){
        return this.authService.Signin(dto)
     }
}