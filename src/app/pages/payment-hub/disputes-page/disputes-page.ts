import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-disputes-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disputes-page.html',
  styleUrls: ['./disputes-page.scss']
})
export class DisputesPageComponent implements OnInit {
  // Main Tabs
  activeTab: string = 'history';

  // Analytics State
  totalCases: number = 0;
  pendingCases: number = 0;
  resolvedCases: number = 0;

  // Filter State
  searchQuery: string = '';
  filterType: string = '';
  filterStatus: string = '';

  // Bulk Action State
  selectAll: boolean = false;
  
  // Selected Case for Modal
  selectedCase: any = null;

  // Data Store
  private allDisputes = [
    {
      id: 'CAS-8829',
      date: 'Mar 28, 2026',
      transId: 'TXN_99021445',
      type: 'Unauthorized Charge',
      detail: 'Reported via Mobile App',
      amount: 1240.00,
      currency: '$',
      status: 'Under Review',
      statusClass: 'badge-light-warning',
      lastUpdate: '2 hours ago',
      selected: false,
      timeline: [
        { time: '14:30', date: 'Mar 28, 2026', iconClass: 'text-primary', desc: 'Payer flagged transaction as unauthorized.' },
        { time: '16:15', date: 'Mar 28, 2026', iconClass: 'text-warning', desc: 'Case assigned to Compliance Officer.' },
        { time: 'Current', date: '', iconClass: 'text-muted', desc: 'Awaiting supporting documentation from the merchant.' }
      ]
    },
    {
      id: 'CAS-8710',
      date: 'Mar 25, 2026',
      transId: 'TXN_88120092',
      type: 'Duplicate Payment',
      detail: 'System Auto-Flagged',
      amount: 45.00,
      currency: '$',
      status: 'Resolved (Refunded)',
      statusClass: 'badge-light-success',
      lastUpdate: 'Mar 26, 2026',
      selected: false,
      timeline: [
        { time: '09:00', date: 'Mar 25, 2026', iconClass: 'text-primary', desc: 'Case opened automatically by system.' },
        { time: '10:30', date: 'Mar 26, 2026', iconClass: 'text-success', desc: 'Refund issued to originating account.' }
      ]
    },
    {
      id: 'CAS-8655',
      date: 'Mar 22, 2026',
      transId: 'TXN_11203948',
      type: 'Goods/Services Not as Described',
      detail: 'Dispute Case #4410',
      amount: 3500.00,
      currency: '$',
      status: 'Awaiting Bank Response',
      statusClass: 'badge-light-primary',
      lastUpdate: 'Yesterday',
      selected: false,
      timeline: [
        { time: '11:20', date: 'Mar 22, 2026', iconClass: 'text-primary', desc: 'User submitted evidence of non-delivery.' },
        { time: 'Current', date: '', iconClass: 'text-warning', desc: 'Awaiting response from merchant acquiring bank.' }
      ]
    },
    {
      id: 'CAS-8540',
      date: 'Mar 20, 2026',
      transId: 'TXN_77402199',
      type: 'Unauthorized Charge',
      detail: 'Card-not-present fraud',
      amount: 890.00,
      currency: '$',
      status: 'High Risk Audit',
      statusClass: 'badge-light-danger',
      lastUpdate: '4 hours ago',
      selected: false,
      timeline: [
        { time: '08:15', date: 'Mar 20, 2026', iconClass: 'text-danger', desc: 'Flagged for potential card skimming ring.' }
      ]
    }
  ];

  filteredDisputes: any[] = [];

  ngOnInit() {
    this.applyFilters();
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // --- Filtering & Analytics ---
  applyFilters() {
    let result = this.allDisputes;

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(d => 
        d.id.toLowerCase().includes(q) || 
        d.transId.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q)
      );
    }

    if (this.filterType) {
      result = result.filter(d => d.type === this.filterType);
    }

    if (this.filterStatus) {
      result = result.filter(d => d.status.includes(this.filterStatus));
    }

    this.filteredDisputes = result;
    this.updateAnalytics();
    this.checkSelectionState();
  }

  updateAnalytics() {
    this.totalCases = this.allDisputes.length;
    this.resolvedCases = this.allDisputes.filter(d => d.status.includes('Resolved')).length;
    this.pendingCases = this.totalCases - this.resolvedCases;
  }

  // --- Bulk Actions ---
  toggleSelectAll() {
    this.filteredDisputes.forEach(d => d.selected = this.selectAll);
  }

  checkSelectionState() {
    if (this.filteredDisputes.length === 0) {
      this.selectAll = false;
      return;
    }
    this.selectAll = this.filteredDisputes.every(d => d.selected);
  }

  get selectedCount(): number {
    return this.filteredDisputes.filter(d => d.selected).length;
  }

  resolveSelected() {
    const selected = this.filteredDisputes.filter(d => d.selected);
    if (selected.length > 0) {
      selected.forEach(d => {
        const item = this.allDisputes.find(x => x.id === d.id);
        if (item) {
          item.status = 'Resolved (Bulk Action)';
          item.statusClass = 'badge-light-success';
          item.lastUpdate = 'Just now';
          item.selected = false;
        }
      });
      this.selectAll = false;
      this.applyFilters();
      alert(`Successfully marked ${selected.length} disputes as Resolved!`);
    }
  }

  // --- Modals ---
  openDisputeDetails(dispute: any) {
    this.selectedCase = dispute;
  }

  markAsResolved() {
    if (this.selectedCase) {
      const item = this.allDisputes.find(x => x.id === this.selectedCase.id);
      if (item) {
        item.status = 'Resolved (Manual)';
        item.statusClass = 'badge-light-success';
        item.lastUpdate = 'Just now';
      }
      this.applyFilters();
      // Bootstrap modal dismiss handles closing
    }
  }

  resubmitUrgent() {
    alert('Case escalated to Priority Senior Desk.');
  }

  submitNewDispute() {
    alert('New Dispute Filed Successfully!');
    this.setTab('history');
  }
}