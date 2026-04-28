import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurring-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recurring-page.html',
  styleUrls: ['./recurring-page.scss']
})
export class RecurringPageComponent implements OnInit {
  // Main Tab State
  activeMainTab: 'outflows' | 'inflows' = 'outflows';
  
  // Search State
  outflowSearch: string = '';

  // Multi-step Outflow Modal State
  outflowStep: number = 1;
  destType: 'sendmo' | 'mobile' | 'bank' = 'sendmo';
  fundSource: 'wallet' | 'card' = 'wallet';
  outflowAmount: number | null = null;
  outflowFreq: string = 'Monthly';
  outflowNotifPrebill: boolean = true;
  outflowNotifReceipt: boolean = true;

  // Mock Data
  outflows = [
    {
      initial: 'A',
      name: 'AWS Cloud Services',
      category: 'Infrastructure',
      amount: 2400.00,
      frequency: 'Monthly',
      nextBilling: 'Nov 24, 2025',
      status: 'ACTIVE',
      statusClass: 'badge-light-success'
    }
  ];

  collections = [
    {
      initial: 'V',
      avatarClass: 'bg-light-info text-info',
      name: 'Vertex Studio',
      category: 'Design Retainer',
      status: 'Collecting',
      statusClass: 'badge-light-success text-success',
      amount: 1200.00,
      frequency: 'Monthly',
      nextBilling: 'Nov 2'
    },
    {
      initial: 'N',
      avatarClass: 'bg-light-warning text-warning',
      name: 'Nexa Corp',
      category: 'Cloud Hosting',
      status: 'Paused',
      statusClass: 'badge-light-warning text-warning',
      amount: 450.00,
      frequency: 'Weekly',
      nextBilling: '-'
    },
    {
      initial: 'A',
      avatarClass: 'bg-light-primary text-primary',
      name: 'Apex Logistics',
      category: 'Fleet Support',
      status: 'Awaiting Card',
      statusClass: 'badge-light-info text-info',
      amount: 3500.00,
      frequency: 'Quarterly',
      nextBilling: '-'
    }
  ];

  filteredOutflows = [...this.outflows];

  ngOnInit() {
    this.applyOutflowFilter();
  }

  // --- UI Triggers ---
  setMainTab(tab: 'outflows' | 'inflows') {
    this.activeMainTab = tab;
  }

  applyOutflowFilter() {
    if (!this.outflowSearch) {
      this.filteredOutflows = [...this.outflows];
    } else {
      const term = this.outflowSearch.toLowerCase();
      this.filteredOutflows = this.outflows.filter(o => 
        o.name.toLowerCase().includes(term) || 
        o.category.toLowerCase().includes(term)
      );
    }
  }

  // --- Outflow Modal Logic ---
  resetOutflowModal() {
    this.outflowStep = 1;
    this.destType = 'sendmo';
    this.fundSource = 'wallet';
    this.outflowAmount = null;
    this.outflowFreq = 'Monthly';
    this.outflowNotifPrebill = true;
    this.outflowNotifReceipt = true;
  }

  nextOutflowStep(step: number) {
    this.outflowStep = step;
  }

  copyTrackLink() {
    navigator.clipboard.writeText('https://pay.sendmo.co/track/REC-8821X').then(() => {
      alert('Tracking link copied to clipboard!');
    });
  }

  copyCollectLink() {
    navigator.clipboard.writeText('https://pay.sendmo.co/collect/CL-2094B').then(() => {
      alert('Collection link copied to clipboard!');
    });
  }

  confirmOutflow() {
    alert('Recurring Payment Activated Successfully!');
    // API logic goes here
  }

  cancelSubscription() {
    alert('Subscription Cancelled Successfully.');
    // API logic goes here
  }
}