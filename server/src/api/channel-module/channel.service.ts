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
       
        const updatedChannel = await  this.databaseService.channel.update({
            where:{id: user.channelId},
            data:{
                channelName:request.body.channelName,
                channelDescription:request.body.channelDescription,
                picture:uploadUrl,
                about:request.body.about
            }
           })
       console.log(uploadUrl);
       
       return {success:true,message:uploadUrl}
    }

    async getChannelDetails(request : request) {

        const id = request.userId

        const user = await  this.databaseService.user.findUnique({
            where:{id:id},
            select:{channelId:true,email:true}
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
        console.log(channel);
        
        return {
            success:true,
            email:user.email,
            channel
        }
    }

    async subscribe(request:request,body:Record<string,any>){

         const userId = request.userId;

         const channelId = body.channelId;

        console.log(userId);
        
         console.log(channelId);
         
        const updatedchannel = await  this.databaseService.channel.update({
            where:{
                id:channelId
            },
            data:{
                subscribers:{
                    increment:1
                }
            }
        })

        const userSubscriptions = await this.databaseService.user.update({
            where:{
                id:userId
            },
            data:{
                subscriptions:{
                  connect:{
                    id:channelId
                  }
                }
            }
        })

        return {
            Success:true
        }



    }

    async unsubscribe(request:request,body:Record<string,any>){

         const userId = request.userId;
         const channelId = body.channelId;

        const updatedchannel = await  this.databaseService.channel.update({
            where:{
                id:channelId
            },
            data:{
                subscribers:{
                    decrement:1
                }
            }
        })

        const userSubscriptions = await this.databaseService.user.update({
            where:{
                id:userId
            },
            data:{
                subscriptions:{
                  disconnect:{
                    id:channelId
                  }
                }
            }
        })

        return {
            Success:true
        }



    }

    async checkSubscriptionStatus(request:request, body:Record<string,any>){

        const userId = request.userId;
        const channelId = body.channelId;

        const channel  = await this.databaseService.user.findUnique({
            where:{
                id:userId,
                subscriptions:{
                    some:{
                        id:channelId
                    },
                },
            },
            select:{
                id:true
            }
            
        })

        if(channel){
            return {
                isSubscribed:true
            }

        }
        else{
            return {
                isSubscribed:false
            }
        }
    }
}