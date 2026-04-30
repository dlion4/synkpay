import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-performance-layout',
  standalone: true,
  imports: [RouterOutlet],
  template:`
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./dashboard-performance-layout.scss']
})
export class DashboardPerformanceLayoutComponent {}