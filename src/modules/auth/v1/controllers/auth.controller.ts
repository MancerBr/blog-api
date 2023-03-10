import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from '../services';
import { CurrentUser } from '../../../../shared/decorators';
import { CreateUserDto } from '../../../user/v1/dto';
import { LocalAuthGuard } from '../../guards';
import { JwtDto, SignInDto } from '../dto';
import { Public } from '../../decorators';
import { User } from '../../../user/entities';
import { getErrorSwaggerSchema } from '../../../../shared/utils';

@ApiTags('auth')
@Public()
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: JwtDto })
  @ApiUnauthorizedResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Incorrect credentials',
      error: 'Unauthorized',
    }),
  })
  signIn(@CurrentUser() user: User): Promise<JwtDto> {
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  @ApiCreatedResponse({ type: JwtDto })
  @ApiConflictResponse({
    description: 'User with this email already exist, use another email',
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.CONFLICT,
      message: 'User [email] already exist!',
      error: 'Conflict',
    }),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'password must be longer than or equal to 6 characters',
        'password must be a string',
        'firstName should not be empty',
        'firstName must be a string',
        'lastName should not be empty',
        'lastName must be a string',
        'email must be an email',
      ],
      error: 'Bad Request',
    }),
  })
  signUp(@Body() body: CreateUserDto): Promise<JwtDto> {
    return this.authService.signUp(body);
  }
}
