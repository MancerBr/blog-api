import { OmitType } from '@nestjs/swagger';

import { CommentResponseDto } from './comment-response.dto';

export class DeleteCommentResponseDto extends OmitType(CommentResponseDto, [
  'id',
]) {}
