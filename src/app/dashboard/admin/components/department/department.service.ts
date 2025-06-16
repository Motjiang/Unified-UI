import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../../../../account/service/account.service';
import { PagedDepartmentResponse } from './models/paged-department-response';
import { environment } from '../../../../../environments/environment.development';
import { CreateDepartment } from './models/create-department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient, private accountService:AccountService) { }
  
   getAllDepartments(pageIndex: number, pageSize: number, searchString: string) {
    const params = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
      searchString: searchString
    };
  
    return this.http.get<PagedDepartmentResponse>(
      `${environment.appUrl}/api/department/get-all-departments`,
      { params, ...this.getAuthHeaders() }
    );
  }

  addDepartment(department: CreateDepartment) : Observable<CreateDepartment> {
    return this.http.post<CreateDepartment>(`${environment.appUrl}/api/department/add-department`, department, this.getAuthHeaders());
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
