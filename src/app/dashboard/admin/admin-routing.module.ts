import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './security/admin.guard';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { DesignationComponent } from './components/designation/designation.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { AddDesignationComponent } from './components/add-designation/add-designation.component';


const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'department', component: DepartmentComponent
      },
      {
        path: 'add-department', component: AddDepartmentComponent
      },
      {
        path: 'designation', component: DesignationComponent
      },
      {
        path: 'add-designation', component: AddDesignationComponent
      },
      {
        path: 'employee', component: EmployeeComponent
      }
    ]
  },
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
export class AdminRoutingModule { }
