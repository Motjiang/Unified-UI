import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav>
  <ul class="pagination d-flex justify-content-center">
    <li
      class="page-item"
      *ngFor="let page of getPages(); let i = index"
      [class.active]="i + 1 === pageIndex"
    >
      <a class="page-link" (click)="onPageChange(i + 1)">
        {{ i + 1 }}
      </a>
    </li>
  </ul>
</nav>

  `,
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() pageIndex: number = 1;
  @Input() searchString: string = '';
  @Output() pageChanged = new EventEmitter<number>();

  getPages(): number[] {
    return Array(this.totalPages).fill(0);
  }

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }

}
