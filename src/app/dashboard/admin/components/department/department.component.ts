import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [RouterLink],
  template: `
        <h5 class="text-center mt-5 mb-5 display-5">Available Departments</h5>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1></h1>
        <a class="btn btn-primary"  [routerLink]="['/add-course']">
            <i class="bi bi-plus-circle"></i> Add Department
</a>
    </div>

    <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Department Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Human Resource</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Marketing</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Information Technology</td>
                </tr>
            </tbody>
        </table>
</div>
  `,
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

}
