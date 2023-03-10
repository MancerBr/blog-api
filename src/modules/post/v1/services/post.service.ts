import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CurrentUserDto, PaginationQueryDto } from '../../../../shared/dto';
import { Post } from '../../entities';
import {
  paginateResponse,
  parsePaginationQuery,
} from '../../../../shared/utils';
import { ERole } from '../../../auth/enums';
import {
  CreatePostDto,
  DeletePostDto,
  PostDto,
  PostPaginationDto,
  SavePostResponseDto,
  UpdatePostDto,
} from '../dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async getAll(query: PaginationQueryDto): Promise<PostPaginationDto> {
    const { skip, take } = parsePaginationQuery(query);
    const [posts, countPosts] = await this.postsRepository.findAndCount({
      select: {
        id: true,
        title: true,
        author: {
          id: true,
          email: true,
        },
      },
      relations: ['author'],
      skip,
      take,
    });

    return paginateResponse(posts, countPosts, query.page, query.size);
  }

  public getOne(id: number): Promise<PostDto> {
    return this.postsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['author'],
    });
  }

  public create(
    authorId: number,
    body: CreatePostDto,
  ): Promise<SavePostResponseDto> {
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...body,
    });
    return this.postsRepository.save(post);
  }

  public async update(
    currentUser: CurrentUserDto,
    postId: number,
    body: UpdatePostDto,
  ): Promise<PostDto> {
    const post = await this.findOneByCurrentUser(currentUser, postId);
    return this.postsRepository.save({
      ...post,
      ...body,
    });
  }

  public async delete(
    currentUser: CurrentUserDto,
    postId: number,
  ): Promise<DeletePostDto> {
    const post = await this.findOneByCurrentUser(currentUser, postId);
    return this.postsRepository.remove(post);
  }

  private async findOneByCurrentUser(
    currentUser: CurrentUserDto,
    postId: number,
  ): Promise<Post> {
    const post = await this.postsRepository.findOneOrFail({
      where: {
        id: postId,
      },
      relations: ['author'],
    });

    const isWriter = currentUser.role === ERole.Writer;

    if (isWriter && post?.author?.id !== currentUser.sub) {
      throw new ForbiddenException();
    }

    return post;
  }
}
