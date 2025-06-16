import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '../department/models/department';
import { ToastService } from '../../../../shared/service/toast.service';
import { DepartmentService } from '../department/department.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container">
      <h2 class="text-center mt-5 mb-5 display-5">Add Department</h2>
      <div class="row">
        <form [formGroup]="departmentForm" (ngSubmit)="onSubmit()">
          <div class="col-md-12">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" formControlName="name" />
            <label for="floatingInput">Department name...</label>
             <span class="text-danger" *ngIf="submitted && departmentForm.get('name')?.hasError('required')">
                        Department name is required
                    </span>
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Add Department
          </button>

          <a type="submit" class="btn btn-outline-secondary mt-3 w-100" [routerLink]="['/dashboard/admin/department']">Back to list</a>
          
        </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './add-department.component.css',
})
export class AddDepartmentComponent implements OnInit {

  departmentForm : FormGroup = new FormGroup({});
  
  submitted = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private toastSevice: ToastService, private departmentService: DepartmentService ) {

  }

    ngOnInit(): void {
    this.initializeForm();
  }

   initializeForm() {
    this.departmentForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit() {
  this.submitted = true;
  this.errorMessages = [];

  if (this.departmentForm.valid) {
    this.departmentService.addDepartment(this.departmentForm.value).subscribe({
      next: (res) => {
        this.toastSevice.showToast(true,'Department added successfully.');
        this.departmentForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        const message = err.error?.message || 'Failed to add department.';
        this.toastSevice.showToast(false, message);

        this.errorMessages.push(message);
      }
    });
  } else {
    this.toastSevice.showToast(false, 'Validation Error');
  }
}


}
