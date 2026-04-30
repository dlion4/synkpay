import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-legacy-layout',
  standalone: true,
  imports: [RouterOutlet],
  template:`
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./dashboard-legacy-layout.scss']
})
export class DashboardLegacyLayoutComponent {}