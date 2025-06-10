import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [RouterLink],
  template: `
     <h5 class="text-center mt-5 mb-5 display-5">Available Designations</h5>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1></h1>
        <a class="btn btn-primary"  [routerLink]="['/add-course']">
            <i class="bi bi-plus-circle"></i> Add Designation
</a>
    </div>

    <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Designation Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Hiring manager</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Sales Lead</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Intermediate Software Engineer</td>
                </tr>
            </tbody>
        </table>
</div>
  `,
  styleUrl: './designation.component.css'
})
export class DesignationComponent {

}
