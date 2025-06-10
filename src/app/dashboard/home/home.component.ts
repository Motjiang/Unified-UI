import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/service/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert alert-info mt-5" role="alert">
  🔄 <strong>System Update Notice:</strong> The system undergoes routine updates every <strong>Wednesday</strong>. You may experience brief interruptions during this time.
</div>

<div class="d-flex justify-content-between align-items-center mb-3">
  <h4 class="fs-3 fw-bold mb-0" *ngIf="roles.length > 0">Hi, {{ roles.join(', ') }} 🐐</h4>
  <button class="btn btn-outline-primary">Download PDF</button>
</div>

<!-- Content Row -->
<div class="row g-4">
 
  <div class="col-xl-3 col-md-6">
    <div class="card border-start border-primary shadow h-100 py-2">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <div class="text-uppercase text-primary fw-bold small mb-1">Employees (Recent)</div>
            <div class="h5 mb-0 fw-bold text-gray-800">20</div>
          </div>
          <i class="fas fa-calendar fa-2x text-gray-300"></i>
        </div>
      </div>
    </div>
  </div>

  <div class="col-xl-3 col-md-6">
    <div class="card border-start border-success shadow h-100 py-2">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <div class="text-uppercase text-success fw-bold small mb-1">Departments (Active)</div>
            <div class="h5 mb-0 fw-bold text-gray-800">4</div>
          </div>
          <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
        </div>
      </div>
    </div>
  </div>

   <div class="col-xl-3 col-md-6">
    <div class="card border-start border-info shadow h-100 py-2">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <div class="text-uppercase text-info fw-bold small mb-1">Books</div>
            <div class="h5 mb-0 fw-bold text-gray-800">6</div>
          </div>
          <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
        </div>
      </div>
    </div>
  </div>

  <div class="col-xl-3 col-md-6">
    <div class="card border-start border-warning shadow h-100 py-2">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <div class="text-uppercase text-warning fw-bold small mb-1">Pending Ordes</div>
            <div class="h5 mb-0 fw-bold text-gray-800">18</div>
          </div>
          <i class="fas fa-comments fa-2x text-gray-300"></i>
        </div>
      </div>
    </div>
  </div>

</div>
<!-- End Content Row -->
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  roles: string[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.roles = this.accountService.getUserRoles();
  }

}
