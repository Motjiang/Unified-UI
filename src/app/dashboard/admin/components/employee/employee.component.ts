import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // use Router to navigate
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';;
import { EmployeeService } from './employee.service';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { Employee } from './models/employee';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/models/department';
import { Designation } from '../designation/models/designation';
import { DesignationService } from '../designation/designation.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  template: `
  <div class="container">
  <!-- Section Title -->
  <h2 class="text-center mt-5 mb-5 display-5">List of Employees</h2>

  <!-- Action Row -->
<div class="row gy-3 align-items-center mb-4">
  <!-- New Employee Button -->
  <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
    <a class="btn btn-primary">
      <i class="bi bi-plus"></i> New Employee
    </a>
  </div>

  <!-- Filters + Search -->
  <div class="col-12 col-md-6">
  <form
  class="d-flex justify-content-md-end align-items-center gap-2 flex-nowrap"
  (ngSubmit)="onSearch()"
  role="search"
  novalidate
>

  <!-- Department Filter -->
  <select
    class="form-select"
    [(ngModel)]="selectedDepartment"
    name="department"
    aria-label="Filter by department"
style="width: auto; display: inline-block;"
    (change)="onSearch()"
  >
    <option value="">All Departments</option>
    <option *ngFor="let d of departments" [value]="d.id">{{ d.name }}</option>
  </select>

  <!-- Search Input -->
  <input
    class="form-control"
    type="search"
    [(ngModel)]="search"
    name="search"
    placeholder="Search by first or last name"
    aria-label="Search employees"
 style="width: auto; min-width: 240px; max-width: 600px; flex-grow: 2;"  />

  <!-- Search Button -->
  <button class="btn btn-outline-success d-flex align-items-center" type="submit">
    <i class="bi bi-search me-1"></i> Search
  </button>
</form>

  </div>
</div>


  <!-- Employees Table -->
  <table class="table table-hover">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Designation</th>
        <th>Department</th>
        <th class="text-md-end">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let emp of employees">
        <td>{{ emp.firstName }}</td>
        <td>{{ emp.lastName }}</td>
        <td>{{ emp.designationId }}</td>
        <td>{{ emp.departmentId }}</td>
        <td class="text-md-end" style="white-space: nowrap">
          <button class="btn btn-sm btn-warning me-2">
            <i class="bi bi-pencil-square"></i> Update
          </button>
          <button class="btn btn-sm btn-danger">
            <i class="bi bi-trash3"></i> Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Pagination Component -->
  <app-pagination
  [totalPages]="totalPages"
  [pageIndex]="currentPage"
  [searchString]="search"
  (pageChanged)="onPageChange($event)"
></app-pagination>
</div>

  `,
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];

  departments!: Department[];
  selectedDepartment: number | '' = '';
  search: string = '';

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;

  employeeToDelete: Employee | undefined;

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private router: Router) { }

  ngOnInit(): void {
    this.loadFilters();
    this.loadEmployees();
  }

  loadFilters() {
    this.getDepartments();
  }

  loadEmployees(): void {
    this.employeeService
      .getAllEmployees(
        this.currentPage,
        this.pageSize,
        this.search,
        this.selectedDepartment === '' ? undefined : this.selectedDepartment
      )
      .subscribe({
        next: response => {
          this.employees = response.data.map(emp => ({
            ...emp,
            dateCreated: new Date(emp.dateCreated),
            dateOfBirth: emp.dateOfBirth ? new Date(emp.dateOfBirth) : undefined,
            userName: emp.email,
            isLocked: false,
            roles: []
          }));

          this.totalPages = Math.ceil(response.totalCount / this.pageSize);
        },
        error: error => {
          console.error('Error fetching employees', error);
        }
      });
  }

  getDepartments() {
    this.departmentService.getAllDepartments(1, 100, '').subscribe({
      next: response => {
        this.departments = response.data;
      },
      error: error => {
        console.error('Error fetching departments', error);
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadEmployees();
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadEmployees();
  }
}
