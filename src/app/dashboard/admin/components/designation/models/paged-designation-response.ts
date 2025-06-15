import { Designation } from "./designation";

export interface PagedDesignationResponse {
  data: Designation[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}
