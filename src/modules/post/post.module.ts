import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './entities';
import { PostController } from './v1/controllers';
import { PostService } from './v1/services';

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
