import { PaginationQueryDto } from '../dto';
import { IPaginationQuery } from '../interfaces';

export const parsePaginationQuery = (
  pagination: PaginationQueryDto,
): IPaginationQuery => {
  const page = pagination.page;
  const take = pagination.size;
  return {
    take,
    skip: (page - 1) * take,
  };
};
