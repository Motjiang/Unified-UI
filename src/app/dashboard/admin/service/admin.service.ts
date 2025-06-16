import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AccountService } from '../../../account/service/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient, private accountService: AccountService) { }

 

}
