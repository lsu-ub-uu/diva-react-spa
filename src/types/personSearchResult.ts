import { Person } from './person';

export interface PersonSearchResult {
  fromNumber: number;
  toNumber: number;
  totalNumber: number;
  data: Person[];
}

export interface PaginationRequest {
  start: number;
  rows: number;
}

export interface PersonSearchRequest {
  searchTerm: string;
  paginationRequest: PaginationRequest;
}
