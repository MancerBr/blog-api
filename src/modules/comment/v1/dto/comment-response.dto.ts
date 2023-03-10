import { OmitType } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';

export class CommentResponseDto extends OmitType(CommentDto, ['subComments']) {}
