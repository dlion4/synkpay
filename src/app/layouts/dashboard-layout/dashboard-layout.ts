import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'synckpay-dashboard-layout',
  imports: [RouterOutlet, RouterLink],
  template: ` <div class="d-flex  min-vh-100">
    <div class="sidebar"  >
      <nav class="nav flex-column p-3">
        <a class="nav-link text-white" routerLink="/dashboard">Dashboard</a>
        <a class="nav-link text-white" routerLink="/dashboard/wallet">Wallet</a>
        <!-- Add more navigation links as needed -->
      </nav>
    </div>
      <main><router-outlet /> </main>
  </div> `,
  styles: `
  .sidebar {
    width: 250px;
    background-color: #d80707ff;
    
  }
  
  `,
})
export class DashboardLayout {}
