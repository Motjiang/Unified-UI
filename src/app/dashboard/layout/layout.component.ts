import { Component } from '@angular/core';
import { LayoutNavbarComponent } from "../layout-navbar/layout-navbar.component";
import { LayoutFooterComponent } from "../layout-footer/layout-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LayoutNavbarComponent, LayoutFooterComponent, RouterOutlet],
  template: `
    <app-layout-navbar/>
    <div class="container-fluid mt-5 py-3 px-5">
      
      <router-outlet/>
    </div>
    <app-layout-footer/>
  `,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
