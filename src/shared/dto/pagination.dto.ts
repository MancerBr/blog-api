import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ example: 11 })
  total: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 2 })
  nextPage: number;

  @ApiProperty({ example: null })
  prevPage: number;

  @ApiProperty({ example: 3 })
  lastPage: number;
}
