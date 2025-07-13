import { Module } from '@nestjs/common';
import { authModule } from './api/auth-module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { channelModule } from './api/channel-module/channel.module';
import { VideoModule } from './api/video-module/video.module';


@Module({
  imports: [authModule,
    channelModule,
    VideoModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Specifies the path to the .env file (default is .env in the root folder)
    }),
  ],
})
export class AppModule {}
