import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { UserIdDto } from '../../../user/v1/dto';

export class SavePostResponseDto extends OmitType(PostDto, ['author']) {
  @ApiProperty({ type: UserIdDto })
  author: UserIdDto;
}
