export interface IPaginationQuery {
  totalPages?: number;
  currentPage?: number;
  next?: number;
  prev?: number;
}

export interface IQueryString {
  readonly search?: string;
  readonly page?: number;
  readonly sort?: string;
  readonly limit?: number;
  readonly fields?: string;
  [key: string]: any;
}

export interface ISearchQuery {
  $or?: Array<{ [key: string]: RegExp }>;
  [key: string]: any;
}
