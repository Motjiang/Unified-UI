import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-notification-message',
  standalone: true,
   imports: [CommonModule],
  template: `
   <div #modalRef class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" [ngClass]="{ 'bg-success': isSuccess, 'bg-danger': !isSuccess }">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" (click)="hide()"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="hide()">Close</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './notification-message.component.css'
})
export class NotificationMessageComponent implements AfterViewInit {
 @ViewChild('modalRef', { static: true }) modalRef!: ElementRef;

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() isSuccess: boolean = true;

  private modalInstance: any;

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement);
  }

  show() {
    this.modalInstance?.show();
  }

  hide() {
    this.modalInstance?.hide();
  }

}
