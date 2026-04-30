import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-card-layout',
  standalone: true,
  imports: [RouterOutlet],
  template:`
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./dashboard-card-layout.scss']
})
export class DashboardCardLayoutComponent {}