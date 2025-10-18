export interface IPagination {
  length: number;
  page: number;
  limit: number;
  pageSizeOption: number[];
}

class Pagination implements IPagination {
  length: number;
  page: number;
  limit: number;
  pageSizeOption: number[];

  constructor(length: number, page: number, limit: number, pageSizeOption: number[]) {
    this.length = length;
    this.page = page;
    this.limit = limit;
    this.pageSizeOption = pageSizeOption;
  }
}

export default Pagination
