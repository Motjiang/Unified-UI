import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { PagedDesignationResponse } from './models/paged-designation-response';
import { AccountService } from '../../../../account/service/account.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient, private accountService:AccountService) { }

 getAllDesignations(pageIndex: number, pageSize: number, searchString: string) {
  const params = {
    pageIndex: pageIndex.toString(),
    pageSize: pageSize.toString(),
    searchString: searchString
  };

  return this.http.get<PagedDesignationResponse>(
    `${environment.appUrl}/api/designation/get-all-designations`,
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
