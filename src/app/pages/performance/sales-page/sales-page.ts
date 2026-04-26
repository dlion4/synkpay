import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-page.html',
  styleUrls: ['./sales-page.scss']
})
export class SalesPageComponent {
  searchQuery: string = '';

  // Dynamic Data for Channels
  channels = [
    { name: 'E-Commerce Store', value: '$42.5K', progress: 65, icon: 'fa-globe', iconColor: 'text-primary', bgClass: 'bg-light-primary', barClass: 'bg-primary' },
    { name: 'Retail POS', value: '$18.2K', progress: 25, icon: 'fa-calculator', iconColor: 'text-success', bgClass: 'bg-light-success', barClass: 'bg-success' },
    { name: 'Mobile App', value: '$9.0K', progress: 10, icon: 'fa-mobile-alt', iconColor: 'text-warning', bgClass: 'bg-light-warning', barClass: 'bg-warning' }
  ];

  // Dynamic Data for Top Products
  topProducts = [
    { name: 'Premium Wireless Headphones', sku: 'AUD-9923', price: '$4,500.00', sales: 241, icon: 'fa-box', iconColor: 'text-primary' },
    { name: 'Ergonomic Laptop Stand', sku: 'OFF-1102', price: '$2,150.00', sales: 180, icon: 'fa-laptop', iconColor: 'text-info' },
    { name: '4K Action Camera Bundle', sku: 'CAM-004', price: '$1,890.00', sales: 65, icon: 'fa-camera', iconColor: 'text-warning' }
  ];

  // Dynamic Data for Orders Table
  recentOrders = [
    { id: '#ORD-8924', customer: 'Albert Flores', initials: 'AF', color: 'primary', date: 'Today, 10:45 AM', total: '$630.00', status: 'Pending', statusColor: 'warning' },
    { id: '#ORD-8923', customer: 'Cody Fisher', initials: 'CF', color: 'success', date: 'Yesterday, 4:20 PM', total: '$119.50', status: 'Fulfilled', statusColor: 'success' },
    { id: '#ORD-8922', customer: 'Esther Howard', initials: 'EH', color: 'info', date: '18 Mar 2026', total: '$2,450.00', status: 'Refunded', statusColor: 'danger' },
    { id: '#ORD-8921', customer: 'Ralph Edwards', initials: 'RE', color: 'dark', date: '17 Mar 2026', total: '$84.00', status: 'Fulfilled', statusColor: 'success' }
  ];

  // Button Action
  exportReport() {
    alert('Preparing your sales report export...');
  }
}