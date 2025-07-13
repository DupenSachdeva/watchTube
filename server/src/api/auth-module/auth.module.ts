import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { DatabaseService } from "src/engine/database/database.service";

@Module(
    {
        providers:[authService,DatabaseService],
        controllers:[authController],
        
    }
)
export class authModule{

}