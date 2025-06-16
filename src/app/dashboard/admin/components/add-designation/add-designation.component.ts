import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../../shared/service/toast.service';
import { DesignationService } from '../designation/designation.service';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/models/department';

@Component({
  selector: 'app-add-designation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container">
      <h2 class="text-center mt-5 mb-5 display-5">Add Designation</h2>
      <div class="row">
        <form [formGroup]="designationForm" (ngSubmit)="onSubmit()">
        <div class="col-md-12">          
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  formControlName="title"
                />
                <label for="floatingInput">Designation title...</label>
                 <span class="text-danger" *ngIf="submitted && designationForm.get('title')?.hasError('required')">
                        Designation title is required
                    </span>
              </div>
              <div class="form-floating mb-3">
                <select
                  class="form-select"
                  id="floatingSelect"
                  formControlName="departmentId"
                  aria-label="Floating label select example"
                >
                 <option value="">Select a department</option>
<option *ngFor="let d of departments" [value]="d.id">{{ d.name }}</option>

                </select>
                <label for="floatingSelect">Department name...</label>
                 <span class="text-danger" *ngIf="submitted && designationForm.get('departmentId')?.hasError('required')">
                        Department name is required
                    </span>
              </div>

              <button type="submit" class="btn btn-primary w-100">
                Add Designation
              </button>
              <a type="submit" class="btn btn-outline-secondary mt-3 w-100" [routerLink]="['/dashboard/admin/designation']">Back to list</a>

            </div>
        </form>
          </div>
        </div>
  `,
  styleUrl: './add-designation.component.css',
})
export class AddDesignationComponent implements OnInit {

  designationForm: FormGroup = new FormGroup({});  
  departments: Department[] = [];
   submitted = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private toastSevice: ToastService,
    private departmentService: DepartmentService, private designationService: DesignationService ) {
  }

  ngOnInit(): void {
    this.designationForm = this.formBuilder.group({
      title: ['', Validators.required],
      departmentId: ['', Validators.required],
    });

    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getAllDepartments(1, 100, '').subscribe({
      next: (res) => {
        this.departments = res.data;
      },
      error: (err) => {
        console.error('Error loading departments', err);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.designationForm.valid) {
      this.designationService.addDesignation(this.designationForm.value).subscribe({
        next: (res) => {
          this.toastSevice.showToast(true,'Designation added successfully.');
          this.designationForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          const message = err.error?.message || 'Failed to add designation.';
          this.toastSevice.showToast(false, message);
          this.errorMessages.push(message);
        }
      });
    } else {
      this.toastSevice.showToast(false, 'Validation Error');
    }
  }
}
