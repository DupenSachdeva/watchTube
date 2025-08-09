import { CloudinaryService } from 'src/engine/core/services/cloudinary.service';
import { Controller, Post, UseGuards, UseInterceptors, UploadedFiles, Req, Body, BadRequestException, Get, Query } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../engine/core/gaurds/authorization.gaurd';
import { VideosService } from './video.service';
import * as multer from 'multer';
import type { request } from '../..';
import { TimeoutInterceptor } from '../../engine/core/services/tmieout';

const storage = multer.memoryStorage();
const multerOptions = {
  storage,
  limits: { files: 2 }
};

@UseInterceptors(TimeoutInterceptor)


@Controller('video')

export class VideoController {

  constructor(private readonly VideosService: VideosService,
    private cloudinaryService:CloudinaryService

  ) {}

 @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'video',     maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 }
    ],
    multerOptions 
  ))
  uploadVideo(
    @Req() req: request,
    @Body() body: Record<string, any>,
    @UploadedFiles() files: {
      video?:     Express.Multer.File[],
      thumbnail?: Express.Multer.File[],
    },
  ) {
    if (!files.video?.[0]) {
      throw new BadRequestException('Video file is required');
    }
    if (!files.thumbnail?.[0]) {
      throw new BadRequestException('Thumbnail file is required');
    }

    const videoFile     = files.video[0];
    const thumbnailFile = files.thumbnail[0];

    return this.VideosService.upload(
      req.userId,
      body,
      videoFile.buffer,
      thumbnailFile.buffer,
    );
  }


  @Get('/get')
  async getVideos(
    @Query('page') page:string,
    @Query('limit') limit:  string
  ){
        
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    return this.VideosService.getPaginatedVideos(pageNumber,pageSize)
  }

}
