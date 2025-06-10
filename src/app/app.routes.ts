import { Routes } from '@angular/router';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { AuthorizationGuard } from './account/security/authorization.guard';
import { HomeComponent } from './dashboard/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then(
        (module) => module.AccountModule
      ),
  },
  {
    path: 'dashboard',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'admin', loadChildren: () => import('./dashboard/admin/admin.module').then(module => module.AdminModule)
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
];
