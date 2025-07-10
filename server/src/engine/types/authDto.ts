import { IsString, IsEmail, MinLength, MaxLength, matches, Matches } from 'class-validator';

export class AuthDto {
  @IsString({message:"enter a valid name"})
  @MinLength(5, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @IsEmail({}, { message: 'enter a valid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(/.[!@#$%^&*(),.?":{}|<>]/,{message:"password must conatain atleast one special character"})
  password: string;
}
