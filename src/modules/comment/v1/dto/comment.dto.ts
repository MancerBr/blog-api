import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserDto } from '../../../user/v1/dto';
import { SubCommentDto } from './sub-comment.dto';

export class CommentDto {
  @ApiPropertyOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty({ type: [SubCommentDto] })
  subComments: SubCommentDto[];

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}
