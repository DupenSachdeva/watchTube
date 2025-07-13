import { Module } from "@nestjs/common";
import { channelService } from "./channel.service";
import { channelController } from "./channel.controller";
import { AuthGuard } from "src/engine/core/gaurds/authorization.gaurd";
import { jwtService } from "src/engine/core/services/jwt.service";
import { CloudinaryService } from "src/engine/core/services/cloudinary.service";
import { DatabaseService } from "src/engine/database/database.service";

@Module({
    imports:[],
    providers:[channelService,AuthGuard,jwtService,CloudinaryService,DatabaseService],
    controllers:[channelController]
})

export class channelModule{}