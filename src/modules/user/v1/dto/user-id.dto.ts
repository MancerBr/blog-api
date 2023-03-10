import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserIdDto extends PickType(UserDto, ['id']) {}
