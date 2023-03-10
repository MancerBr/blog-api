import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ example: 1, type: 'number' })
  page = 1;

  @IsOptional()
  @Min(10)
  @Type(() => Number)
  @ApiPropertyOptional({ example: 20, type: 'number' })
  size = 20;
}
