import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { databaseService } from "src/engine/database/database.service";

@Module(
    {
        providers:[authService,databaseService],
        controllers:[authController],
        
    }
)
export class authModule{

}