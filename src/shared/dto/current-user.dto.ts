import { ERole } from '../../modules/auth/enums';

export class CurrentUserDto {
  sub: number;
  role: ERole;
  iat: number;
  exp: number;
}
