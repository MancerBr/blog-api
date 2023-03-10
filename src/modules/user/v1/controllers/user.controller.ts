import { Body, Controller, Get, HttpStatus, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserService } from '../services';
import { CurrentUser } from '../../../../shared/decorators';
import { UpdateUserDto, UpdateUserRoleDto, UserDto } from '../dto';
import { ERole } from '../../../auth/enums';
import { HasRoles } from '../../../auth/decorators';
import { CurrentUserDto } from '../../../../shared/dto';
import {
  getErrorSwaggerSchema,
  getResourceNotFoundSchema,
  getUnauthorizedErrorSchema,
  getForbiddenResourceSchema,
} from '../../../../shared/utils';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  @ApiConflictResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.CONFLICT,
      message: `Can't update email, try another email`,
      error: 'Conflict',
    }),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'firstName should not be empty',
        'lastName should not be empty',
        'email must be an email',
      ],
      error: 'Bad Request',
    }),
  })
  update(
    @CurrentUser() user: CurrentUserDto,
    @Body() body: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(user.sub, body);
  }

  @HasRoles(ERole.Admin)
  @Put('role')
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  @ApiForbiddenResponse({
    description: 'Only Admin can change user role',
    schema: getForbiddenResourceSchema(),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'userId must be a number conforming to the specified constraints',
        'role must be one of the following values: admin, writer, reader',
      ],
      error: 'Bad Request',
    }),
  })
  @ApiNotFoundResponse({
    schema: getResourceNotFoundSchema(),
  })
  updateRole(@Body() body: UpdateUserRoleDto): Promise<UserDto> {
    return this.userService.updateRole(body);
  }

  @Get('profile')
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  getProfile(@CurrentUser() user: CurrentUserDto): Promise<UserDto> {
    return this.userService.getProfile(user.sub);
  }
}
