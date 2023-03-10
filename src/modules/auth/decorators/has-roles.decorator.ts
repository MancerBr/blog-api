import { SetMetadata } from '@nestjs/common';

import { ERole } from '../enums';

export const HasRoles = (...roles: ERole[]) => SetMetadata('roles', roles);
