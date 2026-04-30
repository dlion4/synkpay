import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-wallet-layout',
  standalone: true,
  imports: [RouterOutlet],
  template:`
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./dashboard-wallet-layout.scss']
})
export class DashboardWalletLayoutComponent {}