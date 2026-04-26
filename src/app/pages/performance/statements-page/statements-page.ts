import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Required for [(ngModel)]

@Component({
  selector: 'app-statements-page',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Added FormsModule here
  templateUrl: './statements-page.html',
  styleUrls: ['./statements-page.scss']
})
export class StatementsPageComponent {
  // Tab & Filter Management
  activeTab: string = 'this_year';
  activeFilter: string = 'All';

  // State variables for the new Filter Controls
  searchQuery: string = '';
  filterType: string = 'all';
  filterStatus: string = 'all';
  notificationsEnabled: boolean = false;

  // Dynamic Data for the Primary Statements Table
  statementsData = [
    { month: 'January', account: 'Sendmo LTD -#0788', period: '2024 Q1', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'February', account: 'Sendmo LTD -#0788', period: '2024 Q1', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'March', account: 'Sendmo LTD -#0788', period: '2024 Q1', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'April', account: 'Sendmo LTD -#0788', period: '2024 Q2', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'May', account: 'Sendmo LTD -#0788', period: '2024 Q2', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'June', account: 'Sendmo LTD -#0788', period: '2024 Q2', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'July', account: 'Sendmo LTD -#0788', period: '2024 Q3', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'August', account: 'Sendmo LTD -#0788', period: '2024 Q3', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'September', account: 'Sendmo LTD -#0788', period: '2024 Q3', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'October', account: 'Sendmo LTD -#0788', period: '2024 Q4', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'November', account: 'Sendmo LTD -#0788', period: '2024 Q4', cashIn: 380399.00, cashOut: 80000.00 },
    { month: 'December', account: 'Sendmo LTD -#0788', period: '2024 Q4', cashIn: 380399.00, cashOut: 80000.00 }
  ];

  // Dynamic Data for the Detailed Sales Table
  salesDetails = [
    { id: '#XGY-346', customer: 'Albert Flores', time: '7 min ago', cost: 86.70, qty: 1, total: 630.00, status: 'Paused', statusClass: 'badge-light-primary' },
    { id: '#YHD-047', customer: 'Jenny Wilson', time: '52 min ago', cost: 4.20, qty: 1, total: 25.00, status: 'Refunded', statusClass: 'badge-light-dark' },
    { id: '#SKP-035', customer: 'Eleanor Pena', time: '20/04/2025', cost: 29.00, qty: 1, total: 290.00, status: 'Failed', statusClass: 'badge-light-danger' },
    { id: '#SKP-567', customer: 'Dan Wilson', time: '20/09/2025', cost: 50.00, qty: 1, total: 590.00, status: 'Completed', statusClass: 'badge-light-success' },
    { id: '#PXF-534', customer: 'Cody Fisher', time: '3 hour ago', cost: 12.00, qty: 1, total: 119.00, status: 'Completed', statusClass: 'badge-light-success' }
  ];

  setTab(tabName: string) {
    this.activeTab = tabName;
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  // Method for the Apply button
  applyFilters() {
    console.log('Applying Filters:', {
      query: this.searchQuery,
      type: this.filterType,
      status: this.filterStatus,
      notifications: this.notificationsEnabled
    });
    alert('Filters applied successfully!');
  }
}