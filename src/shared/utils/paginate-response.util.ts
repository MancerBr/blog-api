import { IPaginateResponse } from '../interfaces';

export const paginateResponse = <TEntity>(
  entities: TEntity[],
  countEntity: number,
  page: number,
  size: number,
): IPaginateResponse<TEntity> => {
  const lastPage = Math.ceil((countEntity || 1) / size);
  return {
    data: entities,
    total: countEntity,
    currentPage: page,
    nextPage: page + 1 > lastPage ? null : page + 1,
    prevPage: page - 1 < 1 ? null : page - 1,
    lastPage,
  };
};
