import { BadRequestException, Injectable } from "@nestjs/common";
import { request } from "src";
import { cloudinaryService } from "src/engine/core/services/cloudinary.service";
import { databaseService } from "src/engine/database/database.service";
import { channelDto } from "src/engine/types/channelCreateDto";
import * as cloudinary from 'cloudinary';
import { url } from "inspector";

@Injectable()
export class channelService{
    constructor(private cloudinaryService:cloudinaryService,
        private databaseService : databaseService
    ){}
    
    async updateChannel(request:request,file:Express.Multer.File){

        

        const id = request.userId

        const user = await  this.databaseService.user.findUnique({
            where:{id:id},
            select:{channelId:true}
        })
        
       

        let uploadUrl;
        try {
            
             uploadUrl = await this.cloudinaryService.uploadToCloudinary(file.buffer,id);
            
        } catch (error) {
            console.log(error);
            
        }
       
        const updatedChannel =await  this.databaseService.channel.update({
            where:{id: user.channelId},
            data:{
                channelName:request.body.channelName,
                channelDescription:request.body.channelDescription,
                picture:uploadUrl
            }
           })
       return uploadUrl
    }
}