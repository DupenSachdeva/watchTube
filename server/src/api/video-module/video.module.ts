
import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideosService } from './video.service';
import { AuthGuard } from 'src/engine/core/gaurds/authorization.gaurd';
import { jwtService } from '../../engine/core/services/jwt.service';
import { CloudinaryService } from '../../engine/core/services/cloudinary.service';
import { DatabaseService } from '../../engine/database/database.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
  ],
  providers: [
  AuthGuard,DatabaseService,jwtService,CloudinaryService,VideosService , ConfigService      // authorization guard for routes
  ],
  controllers: [VideoController],
})

export class VideoModule {}
