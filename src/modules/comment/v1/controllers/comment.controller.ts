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

import { CurrentUser } from '../../../../shared/decorators';
import { CurrentUserDto, PaginationQueryDto } from '../../../../shared/dto';
import { CommentService } from '../services';
import { Public } from '../../../auth/decorators';
import {
  CommentPaginationDto,
  CommentResponseDto,
  CreateCommentDto,
  DeleteCommentResponseDto,
  UpdateCommentDto,
} from '../dto';
import {
  getErrorSwaggerSchema,
  getForbiddenResourceSchema,
  getResourceNotFoundSchema,
  getUnauthorizedErrorSchema,
} from '../../../../shared/utils';

@ApiTags('comments')
@Controller({
  path: 'comments',
  version: '1',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get()
  @ApiOkResponse({
    type: CommentPaginationDto,
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
  getAll(@Query() query: PaginationQueryDto): Promise<CommentPaginationDto> {
    return this.commentService.getAll(query);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @ApiCreatedResponse({ type: CommentResponseDto })
  @ApiNotFoundResponse({
    schema: getResourceNotFoundSchema(`can't find parent post`),
  })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  create(
    @CurrentUser() currentUser: CurrentUserDto,
    @Body() body: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    return this.commentService.create(currentUser.sub, body);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  @ApiForbiddenResponse({
    description: 'User can update only his comments',
    schema: getForbiddenResourceSchema(),
  })
  @ApiNotFoundResponse({
    schema: getResourceNotFoundSchema(),
  })
  @ApiBadRequestResponse({
    schema: getErrorSwaggerSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'text must be a string',
        'Validation failed (numeric string is expected)',
      ],
      error: 'Bad Request',
    }),
  })
  update(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentService.update(currentUser, id, body);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: DeleteCommentResponseDto })
  @ApiUnauthorizedResponse({
    schema: getUnauthorizedErrorSchema(),
  })
  @ApiForbiddenResponse({
    description: 'User can delete only his comments but Admin can delete all',
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
  ): Promise<DeleteCommentResponseDto> {
    return this.commentService.delete(currentUser, id);
  }
}
