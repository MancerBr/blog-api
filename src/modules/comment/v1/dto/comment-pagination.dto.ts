import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '../../../../shared/dto';
import { CommentDto } from './comment.dto';

export class CommentPaginationDto extends PaginationDto {
  @ApiProperty({ type: [CommentDto] })
  data: CommentDto[];
}
