import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../../user/v1/dto';

export class SubCommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
