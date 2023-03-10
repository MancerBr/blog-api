import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

import { UserDto } from './user.dto';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {
  @IsString()
  @MinLength(6)
  @ApiProperty({ default: '123456' })
  password: string;
}
