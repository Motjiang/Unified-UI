import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SendEmailComponent } from './send-email/send-email.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: 'send-email/:mode', component: SendEmailComponent },
]

@NgModule({
  declarations: [],
   imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
