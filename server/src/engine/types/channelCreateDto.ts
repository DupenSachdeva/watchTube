import { IsString, IsEmail, MinLength, MaxLength, matches, Matches, isString } from 'class-validator';

export class channelDto {

    @IsString({message:"enter a valid name"})
    @MinLength(5, { message: 'Name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Name must not exceed 50 characters' })
    channelName: string;
  
    @IsString({})
    channelDescription :string;
    
  }