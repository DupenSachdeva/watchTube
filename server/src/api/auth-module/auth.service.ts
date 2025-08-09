import { Injectable } from "@nestjs/common";
import { hash, verify } from "argon2";
import { DatabaseService } from "src/engine/database/database.service";
import { AuthDto, type AuthDto2 } from "src/engine/types/authDto";
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";
@Injectable()
export class authService{
    constructor(private databaseService:DatabaseService,private configService :ConfigService){}

    async Signup(dto:AuthDto){

           try {
            let user = await  this.ifUserExists(dto)

            if(user)
                return {
                    success:false,
                    message:"user alreadey exists,please login"};
    
               const hashedPassword = await hash(dto.password);
    
               user = await this.databaseService.user.create({
                  
                data:{
                    name:dto.name,
                    email:dto.email,
                    password:hashedPassword,
                    channel:{
                        create:{
                            channelName:dto.name,
                            picture:"",
                            channelDescription:""
                        }

                    }
                },
                
                
               })

               
    
               const payload = {
                userId:user.id
               }
    
    
               const token = jwt.sign(payload,"tt",{expiresIn:'1hr'})
               return {
                success:true,
                token
               }

           } catch (error) {
              return {
                success:false,
                message:error
              }
           }

          
    }
    

    async Signin(   body:  Record<string, any>
){
          console.log("hi signin");
          
          let user = await  this.databaseService.user.findUnique({
            where:{
                email:body.email,
            }
          })
          
          if(!user)
            return {
                success:false,
                message:"user does not exists"}
          
          const matchPassword =await  verify(user.password,body.password)
          
          if(!matchPassword)
          {
                  return {
                    success:false,
                    message:"invalid password"}
          }
          
          const payload = {userId:user.id}

          const token = jwt.sign(payload,"tt",{expiresIn:"1hr"})

          return {
            token , 
            name:user.name
          };    
    }

    async ifUserExists(dto:AuthDto){
        let user = await this.databaseService.user.findUnique({
            where:{
                name:dto.name
            }

           })

           if(user)
            return user

           user = await this.databaseService.user.findUnique({
            where:{
                email:dto.email
            }

           })
           
           if(user)
            return user

           return null

        

    }
} 