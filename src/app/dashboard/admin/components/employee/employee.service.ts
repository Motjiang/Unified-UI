import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../../../../account/service/account.service';
import { PagedEmplyeeResponse } from './models/paged-emplyee-response';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient, private accountService: AccountService) {}

  getAllEmployees(pageIndex: number, pageSize: number, searchString: string, designationId?: number, departmentId?: number) {
    const params: any = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
      searchString: searchString
    };

    if (designationId !== undefined && designationId !== null) {
      params.designationId = designationId.toString();
    }

    if (departmentId !== undefined && departmentId !== null) {
      params.departmentId = departmentId.toString();
    }

    return this.http.get<PagedEmplyeeResponse>(
      `${environment.appUrl}/api/employee/get-all-employees`,
      { params, ...this.getAuthHeaders() }
    );
  }

  private getAuthHeaders() {
    const jwt = this.accountService.getJWT();
    return {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };
  }
}
