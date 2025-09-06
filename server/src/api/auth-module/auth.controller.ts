import { Body, Controller, Get, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { AuthDto, AuthDto2 } from "src/engine/types/authDto"; // ✅ corrected import

@Controller('auth')
export class authController {
  constructor(private readonly authService: authService) {}


  @Get("/test")
  async Test(){
    return "This is working !"
  }

  @Post('signup')
  
  async Signup(@Body() dto: AuthDto) {
    console.log('Signup DTO:', dto); // ✅ Optional for debugging
    return this.authService.Signup(dto);
  }

  @Post('signin')
  async Signin(  @Body() body:  Record<string, any>
) {
    return this.authService.Signin(body);
  }
}
