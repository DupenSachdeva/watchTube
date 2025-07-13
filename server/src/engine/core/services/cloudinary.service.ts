import { Injectable } from '@nestjs/common';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as cloudinary from 'cloudinary';
import * as multer from 'multer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {

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

  async uploadThumbnailToCloudinary(fileBuffer: Buffer,folder:string) {

    return new Promise((resolve, reject) => {

      const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
              folder: folder,
          },
          (error, result) => {
              if (error) return reject(error);
              resolve(result.url);
          }
      );

      uploadStream.end(fileBuffer);
  });

  
  }




  async uploadHlsOnly(
  fileBuffer: Buffer,
  folderPath: string,
): Promise<{ hlsUrl?: string; publicId: string }> {
  const result = await new Promise<cloudinary.UploadApiResponse>((res, rej) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: folderPath,
        eager: [
          {
            format: 'm3u8',
            streaming_profile: 'auto',
          },
        ],
        eager_async: true, // ✅ don’t wait for processing
      },
      (err, result) => (err ? rej(err) : res(result)),
    );
    stream.end(fileBuffer);
  });
   
  const hlsUrl = result.eager?.[0]?.secure_url;

  return {
    publicId: result.public_id,
    hlsUrl, // might be undefined if still processing
  };
}
}