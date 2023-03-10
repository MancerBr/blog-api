import { OmitType } from '@nestjs/swagger';

import { CommentDto } from './comment.dto';

export class DeleteCommentDto extends OmitType(CommentDto, ['id']) {}
