import { Body, Controller, Get, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/engine/core/gaurds/authorization.gaurd";
import { channelDto } from "src/engine/types/channelCreateDto";
import { channelService } from "./channel.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { request } from "src";
import { diskStorage } from "multer";
import { extname } from "path";
import { CloudinaryService } from "src/engine/core/services/cloudinary.service";
import type { Request } from "express";

@Controller('channel')

export class channelController{
    
    constructor(private channelService:channelService,
        private cloudinaryService:CloudinaryService
    ){}

    @Put('/update')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file',{}
 ))
   


    createChannel(
        @UploadedFile() file: Express.Multer.File,
   @Req() request:request,
   
    ){
        
                
      return  this.channelService.updateChannel(request,file)
        
    }

    @Get('/details')
    @UseGuards(AuthGuard)
    getChannelDetails( @Req() request:request){
        return this.channelService.getChannelDetails(request)
    }

    @Post('/subscribe')
    @UseGuards(AuthGuard)

    subscribe(@Req() request:request,
    @Body() body: Record<string,any>
){
        return this.channelService.subscribe(request,body);
    }

    @Post('/unsubscribe')
    @UseGuards(AuthGuard)

    unsubscribe(@Req() request:request,
    @Body() body:Record<string,any>
){
    return this.channelService.unsubscribe(request,body)
}

    @Post('/subsciptionStatus')
    @UseGuards(AuthGuard)

    subscriptionStatus(
        @Req() request:request,
        @Body() body:Record<string,any>
    ){
        return this.channelService.checkSubscriptionStatus(request,body);
    }
}