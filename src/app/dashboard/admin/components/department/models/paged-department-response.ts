import { Department } from "./department";

export interface PagedDepartmentResponse {
    data: Department[];
      totalCount: number;
      pageIndex: number;
      pageSize: number;
}
