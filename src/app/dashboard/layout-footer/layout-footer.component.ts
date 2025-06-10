import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [],
  template: `
    <div class="border-top fixed-bottom py-2 px-5">
  <div class="d-flex flex-row gap-3 ps-3">
    <a href="#" class="border-end pe-3 text-decoration-none">Help and Support – Login Assistance </a>
    <a href="#" class="pe-3 text-decoration-none">FAQ</a>
  </div>
</div>
  `,
  styleUrl: './layout-footer.component.css'
})
export class LayoutFooterComponent {

}
