import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Comment } from '../../comment/entities';
import { User } from '../../user/entities';
import { BaseEntity } from '../../../database/entities';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  text: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
