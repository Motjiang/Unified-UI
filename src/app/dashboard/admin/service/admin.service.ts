import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ViewEmployee } from '../../../shared/models/viewEmployee';
import { UpdateEmployee } from '../../../shared/models/Updatemployee';
import { AddEmployee } from '../../../shared/models/AddEmployee';
import { AccountService } from '../../../account/service/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient, private accountService: AccountService) { }

  getMembers() {
    return this.http.get<ViewEmployee[]>(`${environment.appUrl}/api/employee/get-members`, this.getAuthHeaders());
  }

   getMember(id: string) {
    return this.http.get<UpdateEmployee>(`${environment.appUrl}/api/admin/get-member/${id}`);
  }

  getApplicationRoles() {
    return this.http.get<string[]>(`${environment.appUrl}/api/admin/get-application-roles`);
  }

  addEditMember(model: AddEmployee) {
    return this.http.post(`${environment.appUrl}/api/admin/add-edit-member`, model);
  }

  lockMember(id: string) {
    return this.http.put(`${environment.appUrl}/api/admin/lock-member/${id}`, {});
  }

  unlockMember(id: string) {
    return this.http.put(`${environment.appUrl}/api/admin/unlock-member/${id}`, {});
  }

  deleteMember(id: string) {
    return this.http.delete(`${environment.appUrl}/api/admin/delete-member/${id}`, {});
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
