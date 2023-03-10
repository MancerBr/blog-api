import { ApiProperty, OmitType } from '@nestjs/swagger';

import { PostDto } from './post.dto';
import { AuthorShortInfoDto } from './author-short-info.dto';

export class GetAllPostDto extends OmitType(PostDto, ['author']) {
  @ApiProperty({ type: AuthorShortInfoDto })
  author: AuthorShortInfoDto;
}
