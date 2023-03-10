import { OmitType } from '@nestjs/swagger';

import { PostDto } from './post.dto';

export class DeletePostDto extends OmitType(PostDto, ['id']) {}
