import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-support-layout',
  standalone: true,
  imports: [RouterOutlet],
  template:`
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./dashboard-support-layout.scss']
})
export class DashboardSupportLayoutComponent {}