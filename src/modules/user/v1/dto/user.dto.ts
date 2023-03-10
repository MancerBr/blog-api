import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiPropertyOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Bogdan' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Rs.' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ default: 'testEmail@mail.com' })
  email: string;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}
