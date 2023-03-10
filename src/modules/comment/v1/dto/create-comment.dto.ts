import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

import { CommentDto } from './comment.dto';

export class CreateCommentDto extends OmitType(CommentDto, [
  'id',
  'updatedAt',
  'createdAt',
  'subComments',
  'author',
]) {
  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  commentId: number;
}
