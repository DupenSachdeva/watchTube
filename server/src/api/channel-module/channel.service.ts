import {  Injectable } from "@nestjs/common";
import { request } from "src";
import { CloudinaryService } from "src/engine/core/services/cloudinary.service";
import { DatabaseService } from "src/engine/database/database.service";


@Injectable()
export class channelService{

    constructor(private readonly cloudinaryService:CloudinaryService,
        private databaseService : DatabaseService,
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
                picture:uploadUrl,
                about:request.body.about
            }
           })

       return {success:true,message:uploadUrl}
    }

    async getChannelDetails(request : request) {

        const id = request.userId

        const user = await  this.databaseService.user.findUnique({
            where:{id:id},
            select:{channelId:true}
        })

        const channel = await  this.databaseService.channel.findUnique({
            where:{id: user.channelId},
           })

        if(!channel){
            return  {
                success:false,
                message:"channel does not exist"
            }
        }

        return {
            success:true,
            
            channel
        }
    }
}