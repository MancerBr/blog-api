import { PickType } from '@nestjs/swagger';

import { UserDto } from '../../../user/v1/dto';

export class AuthorShortInfoDto extends PickType(UserDto, ['id', 'email']) {}
