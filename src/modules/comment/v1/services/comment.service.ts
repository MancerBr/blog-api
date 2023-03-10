import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '../../entities';
import { CurrentUserDto, PaginationQueryDto } from '../../../../shared/dto';
import {
  paginateResponse,
  parsePaginationQuery,
} from '../../../../shared/utils';
import { ERole } from '../../../auth/enums';
import {
  CommentPaginationDto,
  CommentResponseDto,
  CreateCommentDto,
  DeleteCommentResponseDto,
} from '../dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  public async getAll(
    query: PaginationQueryDto,
  ): Promise<CommentPaginationDto> {
    const { skip, take } = parsePaginationQuery(query);
    const [comments, countComment] = await this.commentsRepository.findAndCount(
      {
        relations: {
          subComments: {
            author: true,
          },
          author: true,
        },
        skip,
        take,
      },
    );

    return paginateResponse(comments, countComment, query.page, query.size);
  }

  public async create(
    authorId: number,
    body: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = this.commentsRepository.create({
      text: body.text,
      author: { id: authorId },
      post: { id: body.postId },
      ...(body?.commentId ? { subComment: { id: body.commentId } } : {}),
    });

    try {
      const { id } = await this.commentsRepository.save(comment);
      return this.commentsRepository
        .createQueryBuilder('comments')
        .where({ id })
        .leftJoinAndSelect('comments.author', 'author')
        .getOne();
    } catch (e) {
      if (e.code === '23503' && e.detail.includes('posts')) {
        throw new NotFoundException(`can't find parent post`);
      }

      if (e.code === '23503' && e.detail.includes('comments')) {
        throw new NotFoundException(`can't find parent comment`);
      }
      throw e;
    }
  }

  public async update(
    currentUser: CurrentUserDto,
    commentId: number,
    body: any,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsRepository.findOneOrFail({
      where: { id: commentId },
      relations: { author: true },
    });

    if (comment.author.id !== currentUser.sub) {
      throw new ForbiddenException('Forbidden resource');
    }

    return this.commentsRepository.save({
      ...comment,
      ...body,
    });
  }

  public async delete(
    currentUser: CurrentUserDto,
    commentId: number,
  ): Promise<DeleteCommentResponseDto> {
    const comment = await this.commentsRepository.findOneOrFail({
      where: {
        id: commentId,
      },
      relations: ['author'],
    });

    const isAdmin = currentUser.role === ERole.Admin;

    if (!isAdmin && comment?.author?.id !== currentUser.sub) {
      throw new ForbiddenException('Forbidden resource');
    }

    return this.commentsRepository.remove(comment);
  }
}
