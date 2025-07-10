import { Body, Controller, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/engine/core/gaurds/authorization.gaurd";
import { channelDto } from "src/engine/types/channelCreateDto";
import { channelService } from "./channel.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { request } from "src";
import { diskStorage } from "multer";
import { extname } from "path";
import { cloudinaryService } from "src/engine/core/services/cloudinary.service";

@Controller('channel')

export class channelController{
    constructor(private channelService:channelService,
        private cloudinaryService:cloudinaryService
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
}