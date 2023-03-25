import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Post } from '../../post/entities';
import { Comment } from '../../comment/entities';
import { ERole } from '../../auth/enums';
import { BaseEntity } from '../../../database/entities';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.Reader, select: false })
  role: ERole;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @BeforeInsert()
  public async hashPassword() {
    const bcryptSalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, bcryptSalt);
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
