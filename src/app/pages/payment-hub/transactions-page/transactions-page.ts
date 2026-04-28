import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-page.html',
  styleUrls: ['./transactions-page.scss']
})
export class TransactionsPageComponent implements OnInit {
  // Tab State
  activeTab: string = 'audit';
  activeCategoryTab: string = 'All';
  
  // Filter States
  searchText: string = '';
  filterType: string = '';
  filterStatus: string = '';
  filterFromDate: string = '2025-01-01';
  filterToDate: string = '2025-11-09';

  // Export State
  isExporting: boolean = false;
  exportSuccess: boolean = false;

  // Selected Transaction for Modal
  selectedTx: any = null;

  // Statistics
  totalIn: number = 0;
  totalOut: number = 0;
  totalFees: number = 0;

  // Mock Data
  private rawTransactions = [
    {
      id: 'FTX100451',
      date: '2025-11-09 10:30:15',
      description: 'Payment to Global Suppliers Ltd',
      type: 'Send',
      category: 'Outbound',
      amount: -1500.00,
      currency: 'USD',
      status: 'Completed',
      statusClass: 'status-Completed',
      fee: 15.00,
      fxRate: 0.925,
      purpose: 'B2B Invoice Payment',
      counterparty: 'Global Suppliers Ltd',
      fullTimestamp: '2025-11-09T10:30:15.451Z'
    },
    {
      id: 'FTX100450',
      date: '2025-11-09 09:15:00',
      description: 'Salary Deposit from Acme Corp',
      type: 'Receive',
      category: 'Inbound',
      amount: 5200.00,
      currency: 'USD',
      status: 'Completed',
      statusClass: 'status-Completed',
      fee: 0.00,
      fxRate: 1.0,
      purpose: 'Payroll',
      counterparty: 'ACME Corp',
      fullTimestamp: '2025-11-09T09:15:00.000Z'
    },
    {
      id: 'FTX100449',
      date: '2025-11-08 18:45:30',
      description: 'ATM Withdrawal - New York',
      type: 'Withdrawal',
      category: 'Outbound',
      amount: -200.00,
      currency: 'USD',
      status: 'Completed',
      statusClass: 'status-Completed',
      fee: 3.50,
      fxRate: 1.0,
      purpose: 'Cash Out',
      counterparty: 'ATM (JPM)',
      fullTimestamp: '2025-11-08T18:45:30.112Z'
    },
    {
      id: 'FTX100448',
      date: '2025-11-08 14:00:00',
      description: 'Currency Exchange (USD to EUR)',
      type: 'Exchange',
      category: 'FX/Fees',
      amount: -500.00,
      currency: 'USD',
      status: 'Completed',
      statusClass: 'status-Completed',
      fee: 2.00,
      fxRate: 0.930,
      purpose: 'Investment Transfer',
      counterparty: 'Internal Wallet',
      fullTimestamp: '2025-11-08T14:00:00.890Z'
    },
    {
      id: 'FTX100447',
      date: '2025-11-08 11:10:05',
      description: 'Amazon Purchase (Pending)',
      type: 'Card Purchase',
      category: 'Outbound',
      amount: -49.99,
      currency: 'USD',
      status: 'Pending',
      statusClass: 'status-Pending',
      fee: 0.00,
      fxRate: 1.0,
      purpose: 'E-Commerce',
      counterparty: 'AMAZON.COM',
      fullTimestamp: '2025-11-08T11:10:05.333Z'
    },
    {
      id: 'FTX100446',
      date: '2025-11-07 09:00:00',
      description: 'Failed transfer to blocked account',
      type: 'Send',
      category: 'Outbound',
      amount: -100.00,
      currency: 'USD',
      status: 'Failed',
      statusClass: 'status-Failed',
      fee: 0.00,
      fxRate: 1.0,
      purpose: 'Test',
      counterparty: 'Blocked User',
      fullTimestamp: '2025-11-07T09:00:00.000Z'
    }
  ];

  filteredTransactions: any[] = [];

  ngOnInit() {
    this.applyFilters();
  }

  // --- UI State Management ---
  setMainTab(tab: string) {
    this.activeTab = tab;
  }

  setCategoryTab(cat: string) {
    this.activeCategoryTab = cat;
    this.applyFilters();
  }

  // --- Filtering Logic ---
  applyFilters() {
    let result = this.rawTransactions;

    // Search text
    if (this.searchText) {
      const q = this.searchText.toLowerCase();
      result = result.filter(tx => 
        tx.id.toLowerCase().includes(q) || 
        tx.description.toLowerCase().includes(q) || 
        tx.counterparty.toLowerCase().includes(q)
      );
    }

    // Type Filter
    if (this.filterType) {
      result = result.filter(tx => tx.type === this.filterType);
    }

    // Status Filter
    if (this.filterStatus) {
      result = result.filter(tx => tx.status === this.filterStatus);
    }

    // Category Tabs Logic
    if (this.activeCategoryTab !== 'All') {
      if (this.activeCategoryTab === 'Inbound') {
        result = result.filter(tx => tx.amount > 0);
      } else if (this.activeCategoryTab === 'Outbound') {
        result = result.filter(tx => tx.amount < 0 && tx.type !== 'Exchange' && tx.type !== 'Fee');
      } else if (this.activeCategoryTab === 'FX/Fees') {
        result = result.filter(tx => tx.type === 'Exchange' || tx.type === 'Fee' || tx.fee > 0);
      }
    }

    // Date Range Logic
    if (this.filterFromDate && this.filterToDate) {
      const start = new Date(this.filterFromDate).getTime();
      const end = new Date(this.filterToDate);
      end.setHours(23, 59, 59, 999);
      const endTime = end.getTime();

      result = result.filter(tx => {
        const txTime = new Date(tx.date).getTime();
        return txTime >= start && txTime <= endTime;
      });
    }

    this.filteredTransactions = result;
    this.calculateStatistics();
  }

  calculateStatistics() {
    this.totalIn = 0;
    this.totalOut = 0;
    this.totalFees = 0;

    this.filteredTransactions.forEach(tx => {
      if (tx.amount > 0) this.totalIn += tx.amount;
      if (tx.amount < 0) this.totalOut += tx.amount;
      this.totalFees += tx.fee;
    });
  }

  // --- Modal Logic ---
  openTransactionDetails(tx: any) {
    this.selectedTx = tx;
  }

  handleExport() {
    this.isExporting = true;
    this.exportSuccess = false;
    
    // Simulate API delay
    setTimeout(() => {
      this.isExporting = false;
      this.exportSuccess = true;
      alert('Statement generated successfully! (Simulated download)');
      
      // Reset button after a few seconds
      setTimeout(() => {
        this.exportSuccess = false;
      }, 3000);
    }, 3000);
  }
}