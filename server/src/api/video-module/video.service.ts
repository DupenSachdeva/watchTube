import { DatabaseService } from 'src/engine/database/database.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from '../../engine/core/services/cloudinary.service';


@Injectable()
export class VideosService {

  constructor(
    private  CloudinaryService: CloudinaryService,
    private  databaseService:DatabaseService ,
    
  ) {}

  
  async  upload(
    userId: number,
    body: Record<string, any>,
    videoBuffer: Buffer,
    thumbBuffer: Buffer,
  ) 
  
  {
    

    const { title, description, Visibility } = body;

    if (!title || !description) {
      throw new BadRequestException('Title and description are required');
    }

    
    const video = await this.databaseService.video.create({
     
      data: {
    title:       title,
    description: description,
    visibility:  Visibility,

    user:{
        connect:{id:userId}
    }
  }})

    const thumbnailUrl = await this.CloudinaryService.uploadThumbnailToCloudinary(
      thumbBuffer,
      `youtube/${userId}/${video.id}/thumbnails`,
    );


    const { hlsUrl } = await this.CloudinaryService.uploadHlsOnly(
      videoBuffer,
      `youtube/${userId}/videos`,
    );

    
    const finalvideo = await this.databaseService.video.update({
      where:{
        id:video.id
      },
      data:{
        thumbnailUrl:thumbnailUrl,
        hlsUrl:hlsUrl
      }
    })

    console.log(finalvideo);

    return {
      Success:true,
      message:finalvideo
    }
    
  }


  async getPaginatedVideos(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const videos = await this.databaseService.video.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnailUrl: true,
        createdAt: true,
        hlsUrl: true,

        user: {
          select: {
            id: true,
            name: true,
            channel:{
              select:{
                channelName:true,
                picture:true,
                id:true,
                subscribers:true
              }
            }
          },
        },
      },
    });

    return {
      videos: videos.map((video) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        uploadedAt: video.createdAt,
        videoUrl: video.hlsUrl,
        userId: video.user.id,
        channel: video.user.name,
        channelUrl: video.user.channel.picture,
        channelId:video.user.channel.id,
        subscriptions:video.user.channel.subscribers
      })),
    };
  }

  async getComments(random : string){

          let videoId = parseInt(random);
          
          const comments = await this.databaseService.comment.findMany({
            where:{
              videoId:videoId,
            },
            include:{
              replies:true
            }
            
          })

          return comments;
  }

  async comment(
  randomId: string,
  parId: string,
  Body: Record<string, any>
) {

  const videoId = parseInt(randomId);
  const parentId = parseInt(parId);

  const content = Body.content;

  let comment;

  if (parentId === -1) {

    comment = await this.databaseService.comment.create({
      data: {
        content,

        video: {
          connect: {
            id: videoId
          }
        },

        // REQUIRED because Comment has mandatory channel relation
        channel: {
          connect: {
            id: Body.channelId
          }
        }
      }
    });

  } else {

    comment = await this.databaseService.comment.create({
      data: {
        content,

        video: {
          connect: {
            id: videoId
          }
        },

        parent: {
          connect: {
            id: parentId
          }
        },

        // REQUIRED because Comment has mandatory channel relation
        channel: {
          connect: {
            id: Body.channelId
          }
        }
      }
    });

  }

  return comment;
}

  async likeComment(idsample : string){
     let id = parseInt(idsample);
     const comment = await this.databaseService.comment.update({
      where:{id:id},
      data:{
        likes:{
          increment:1
        }
      }
     })

     return {
      success:true,
      comment:comment
     }
  }

  async dislikeComment(idsample : string){
     let id = parseInt(idsample);
     const comment = await this.databaseService.comment.update({
      where:{id:id},
      data:{
        dislikes:{
          increment:1
        }
      }
     })

     return {
      success:true,
      comment:comment
     }
  }



  
}
