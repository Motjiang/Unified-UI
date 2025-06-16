import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { Designation } from './models/designation';
import { DesignationService } from './designation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [RouterLink, CommonModule, PaginationComponent, FormsModule],
  template: `
<div class="container">
  <!-- Section Title -->
  <h2 class="text-center mt-5 mb-5 display-5">List of Designations</h2>

  <!-- Action Row -->
  <div class="row gy-3 align-items-center mb-5">
    <!-- New Designation Button -->
    <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
      <a class="btn btn-primary" [routerLink]="['/dashboard/admin/add-designation']">
        <i class="bi bi-plus"></i> New Designation
      </a>
    </div>

    <!-- Search Form -->
    <div class="col-12 col-md-6">
        <form class="d-flex justify-content-center justify-content-md-end" (ngSubmit)="onSearch()" role="search">
    <input class="form-control me-2"
            type="search"
            [(ngModel)]="search"
            name="search"
            placeholder="Search by designation name."
            aria-label="Search" />
    <button class="btn btn-outline-success btn-sm d-flex align-items-center" type="submit">
        <i class="bi bi-search me-1"></i>Search
    </button>
    </form>
    </div>

    
<table class="table">
  <thead>
    <tr>
      <th>Designation Title</th>
      <th class="text-md-end"></th> <!-- Align actions right on large screens -->
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let designation of designations">
      <td>{{ designation.title }}</td>
      <td class="text-md-end" style="white-space: nowrap">
        <button class="btn btn-sm btn-warning me-2" (click)="onEdit(designation.id)">
          <i class="bi bi-pencil-square"></i> Update
        </button>
        <button class="btn btn-sm btn-danger" (click)="onDelete(designation.id)">
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
</div>

  `,
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {
  designations: Designation[] = [];
  search: string = '';
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;

  constructor(private designationService: DesignationService) {}

  ngOnInit(): void {
    this.loadDesignations();
  }

 loadDesignations(): void {
  this.designationService
    .getAllDesignations(this.currentPage, this.pageSize, this.search)
    .subscribe({
      next: response => {
        this.designations = response.data;
        this.totalPages = Math.ceil(response.totalCount / this.pageSize);
      },
      error: error => {
        console.error('Error fetching designations', error);
      }
    });
}


  onSearch(): void {
    this.currentPage = 1;
    this.loadDesignations();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadDesignations();
  }

  onEdit(id: number): void {
    // Navigate or open modal to edit designation
  }

  onDelete(id: number): void {
    // Confirm and call delete method
  }
 

}
