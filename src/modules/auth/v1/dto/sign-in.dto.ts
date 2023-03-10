import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from '../../../user/v1/dto';

export class SignInDto extends PickType(CreateUserDto, ['email', 'password']) {}
