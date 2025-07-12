import { Injectable } from '@nestjs/common';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as cloudinary from 'cloudinary';
import * as multer from 'multer';
import { ConfigService } from '@nestjs/config';
import { buffer } from 'stream/consumers';

@Injectable()

export class cloudinaryService {

  constructor(private configService:ConfigService) {

    cloudinary.v2.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('API_KEY'),
      api_secret: this.configService.get('API_SECRET')
    });
  }

  getMulterForChannelPicture(userId: number) {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: `youtube/${userId}upload/channel_picture`,  // Folder for channel picture
        allowed_formats: ['jpg', 'png', 'jpeg'],
      } as any, 
    });

    return multer({ storage });
  }
  
  async uploadToCloudinary(fileBuffer: Buffer,userId:number) {

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
              folder: `youtube/${userId}/pictures/channel_picture`,
          },
          (error, result) => {
              if (error) return reject(error);
              resolve(result.url);
          }
      );

      uploadStream.end(fileBuffer);
  });

  
  }


  getMulterForVideos(userId: number) {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: `youtube/${userId}upload/videos`,  // Folder for user videos
        allowed_formats: ['mp4', 'mkv', 'avi'],
      } as any,  // Using `as any` to bypass TypeScript errors
    });
   
    return multer({ storage });
  }
}
