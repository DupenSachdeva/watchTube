import { Module } from '@nestjs/common';
import { authModule } from './api/auth-module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { channelModule } from './api/channel-module/channel.module';


@Module({
  imports: [authModule,
    channelModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Specifies the path to the .env file (default is .env in the root folder)
    }),
  ],
})
export class AppModule {}
