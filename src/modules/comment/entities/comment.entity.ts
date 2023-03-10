import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from '../../user/entities';
import { Post } from '../../post/entities';
import { BaseEntity } from '../../../database/entities';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  text: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post?: Post;

  @ManyToOne(() => Comment, (comment) => comment.subComments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sub_comment_id' })
  subComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.subComment)
  subComments: Comment[];
}
