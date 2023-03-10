import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './entities';
import { CommentController } from './v1/controllers';
import { CommentService } from './v1/services';

@Module({
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  exports: [],
})
export class CommentModule {}
