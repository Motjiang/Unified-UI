import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="text-danger" *ngIf="errorMessages">
      <li *ngFor="let error of errorMessages">
        {{error}}
    </li>
    </ul>
  `,
  styleUrl: './validation-messages.component.css'
})
export class ValidationMessagesComponent {
  @Input() errorMessages: string[] | undefined;
}
