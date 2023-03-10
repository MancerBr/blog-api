import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { UserDto } from '../../../user/v1/dto';

export class PostDto {
  @ApiPropertyOptional()
  id: number;

  @IsString()
  @MinLength(10)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(50)
  @ApiProperty()
  text: string;

  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}
