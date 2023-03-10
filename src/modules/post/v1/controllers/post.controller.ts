import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { HasRoles, Public } from '../../../auth/decorators';
import { ERole } from '../../../auth/enums';
import { CurrentUser } from '../../../../shared/decorators';
import { CurrentUserDto, PaginationQueryDto } from '../../../../shared/dto';
import { PostService } from '../services';
import {
  CreatePostDto,
  DeletePostDto,
  PostDto,
  PostPaginationDto,
  SavePostResponseDto,
  UpdatePostDto,
} from '../dto';
import {
  getErrorSwaggerSchema,
  getForbiddenResourceSchema,
  getResourceNotFoundSchema,
  getUnauthorizedErrorSchema,
} from '../../../../shared/utils';

@ApiTags('posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Get()
  @ApiOkResponse({
    type: PostPaginationDto,
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'page must not be less than 1',
        'size must not be less than 10',
      ],
      error: 'Bad Request',
    }),
  })
  getAll(@Query() query: PaginationQueryDto): Promise<PostPaginationDto> {
    return this.postService.getAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: PostDto })
  @ApiNotFoundResponse({
    schema: getResourceNotFoundSchema(),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed (numeric string is expected)',
      error: 'Bad Request',
    }),
  })
  getOne(@Param('id', ParseIntPipe) id: number): Promise<PostDto> {
    return this.postService.getOne(id);
  }

  @HasRoles(ERole.Admin, ERole.Writer)
  @Post()
  @ApiBearerAuth('JWT')
  @ApiCreatedResponse({ type: SavePostResponseDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  @ApiForbiddenResponse({
    description: 'Only Admin and Writer can create post',
    schema: getForbiddenResourceSchema(),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'title must be longer than or equal to 10 characters',
        'title must be a string',
        'text must be longer than or equal to 50 characters',
        'text must be a string',
      ],
      error: 'Bad Request',
    }),
  })
  create(
    @CurrentUser() currentUser: CurrentUserDto,
    @Body() body: CreatePostDto,
  ): Promise<SavePostResponseDto> {
    return this.postService.create(currentUser.sub, body);
  }

  @HasRoles(ERole.Admin, ERole.Writer)
  @Put(':id')
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: PostDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  @ApiForbiddenResponse({
    description:
      'Only Admin and Writer can update posts, but Writer can update his posts and Admin can update all',
    schema: getForbiddenResourceSchema(),
  })
  @ApiNotFoundResponse({
    schema: getResourceNotFoundSchema(),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'title must be longer than or equal to 10 characters',
        'title must be a string',
        'text must be longer than or equal to 50 characters',
        'text must be a string',
        'Validation failed (numeric string is expected)',
      ],
      error: 'Bad Request',
    }),
  })
  update(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postService.update(currentUser, id, body);
  }

  @HasRoles(ERole.Admin, ERole.Writer)
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: DeletePostDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  @ApiForbiddenResponse({
    description:
      'Only Admin and Writer can delete posts, but Writer can delete his posts and Admin can delete all',
    schema: getForbiddenResourceSchema(),
  })
  @ApiNotFoundResponse({
    schema: getResourceNotFoundSchema(),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed (numeric string is expected)',
      error: 'Bad Request',
    }),
  })
  delete(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeletePostDto> {
    return this.postService.delete(currentUser, id);
  }
}
