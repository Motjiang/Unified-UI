import { Employee } from "./employee";

export interface PagedEmplyeeResponse {
    data: Employee[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}
