export interface IPaginateResponse<TEntity> {
  data: TEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
