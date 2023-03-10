import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '../../../../shared/dto';
import { GetAllPostDto } from './get-all-post.dto';

export class PostPaginationDto extends PaginationDto {
  @ApiProperty({ type: [GetAllPostDto] })
  data: GetAllPostDto[];
}
