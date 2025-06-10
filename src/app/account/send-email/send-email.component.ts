import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from '../../shared/validation-messages/validation-messages.component';
import { CommonModule } from '@angular/common';
import { AccountService } from '../service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessagesComponent, CommonModule],
  template: `
    <div class="d-flex justify-content-center" *ngIf="mode">
    <div class="col-12 col-lg-5">
        <main class="form-signin">
            <form [formGroup]="emailForm" class="form-signin" (ngSubmit)="sendEmail()" autocomplete="off">
                <div class="text-center mb-4">
                    <h1 class="mb-3 font-weight-normal">
                        <span *ngIf="mode.includes('resend-email-confirmation-link')">
                            Resend email confirmation link
                        </span>
                        <span *ngIf="mode.includes('forgot-username-or-password')">
                            Retrieve your username or password
                        </span>
                    </h1>
                </div>

                <div class="form-floating mb-3">
                    <input formControlName="email" type="text" placeholder="Email" class="form-control"
                        [class.is-invalid]="submitted && emailForm.get('email')?.errors">
                    <label for="email">Email</label>
                    <span class="text-danger" *ngIf="submitted && emailForm.get('email')?.hasError('required')">
                        Email is required
                    </span>
                    <span class="text-danger" *ngIf="submitted && emailForm.get('email')?.hasError('pattern')">
                        Invalid email address
                    </span>
                </div>

                <div class="form-floatin" *ngIf="errorMessages.length > 0">
                    <app-validation-messages [errorMessages]="errorMessages"></app-validation-messages>
                </div>

                <div class="row">
                    <div class="col-6">
                        <div class="d-grid">
                            <button class="btn btn-block btn-success" type="submit">Send</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-grid">
                            <button class="btn btn-block btn-danger" type="button" (click)="cancel()">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
</div>
  `,
  styleUrl: './send-email.component.css'
})
export class SendEmailComponent implements OnInit {
  emailForm: FormGroup = new FormGroup({});
  submitted = false;
  mode: string | undefined;
  errorMessages: string[] = [];

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          const mode = this.activatedRoute.snapshot.paramMap.get('mode');
          if (mode) {
            this.mode = mode;
            this.initializeForm();
          }
        }
      }
    })
  }

  initializeForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
    })
  }

  sendEmail() {
  }

  cancel() {
    this.router.navigateByUrl('/account/login');
  }
}
