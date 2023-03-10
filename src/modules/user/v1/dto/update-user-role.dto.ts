import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ERole } from '../../../auth/enums';

export class UpdateUserRoleDto {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsEnum(ERole)
  @ApiProperty({
    enum: ERole,
    example: `${ERole.Admin} | ${ERole.Writer} | ${ERole.Reader}`,
  })
  role: ERole;
}
