import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from './department.service';
import { Department } from './models/department';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [RouterLink, CommonModule, PaginationComponent, FormsModule],
  template: `
<div class="container">
  <h2 class="text-center mt-5 mb-5 display-5">List of Departments</h2>

  <div class="row gy-3 align-items-center mb-5">
    <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
      <a class="btn btn-primary"  [routerLink]="['/dashboard/admin/add-department']">
        <i class="bi bi-plus"></i> New Department
      </a>
    </div>

    <div class="col-12 col-md-6">
      <form class="d-flex justify-content-center justify-content-md-end" (ngSubmit)="onSearch()" role="search">
        <input class="form-control me-2"
               type="search"
               [(ngModel)]="search"
               name="search"
               placeholder="Search by department name."
               aria-label="Search" />
        <button class="btn btn-outline-success btn-sm d-flex align-items-center" type="submit">
          <i class="bi bi-search me-1"></i>Search
        </button>
      </form>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>Department Name</th>
        <th class="text-md-end"></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let department of departments">
        <td>{{ department.name }}</td>
        <td class="text-md-end" style="white-space: nowrap">
          <button class="btn btn-sm btn-warning me-2" (click)="onEdit(department.id)">
            <i class="bi bi-pencil-square"></i> Update
          </button>
          <button class="btn btn-sm btn-danger" (click)="onDelete(department.id)">
            <i class="bi bi-trash3"></i> Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <app-pagination
    [totalPages]="totalPages"
    [pageIndex]="currentPage"
    [searchString]="search"
    (pageChanged)="onPageChange($event)"
  ></app-pagination>
</div>
  `,
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  search: string = '';
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService
      .getAllDepartments(this.currentPage, this.pageSize, this.search)
      .subscribe({
        next: response => {
          this.departments = response.data;
          this.totalPages = Math.ceil(response.totalCount / this.pageSize);
        },
        error: error => {
          console.error('Error fetching departments', error);
        }
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadDepartments();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadDepartments();
  }

  onEdit(id: number): void {
    // Edit logic
  }

  onDelete(id: number): void {
    // Delete logic
  }
}
