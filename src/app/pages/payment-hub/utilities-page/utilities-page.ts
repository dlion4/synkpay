import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilities-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilities-page.html',
  styleUrls: ['./utilities-page.scss']
})
export class UtilitiesPageComponent implements OnInit, OnDestroy {
  // Tab State
  activeMainTab: string = 'pay_bill';

  // Filters State
  searchQuery: string = '';
  filterCategory: string = '';
  filterCountry: string = '';

  // Data Store
  billers = [
    { name: 'National Power Corp', category: 'Electricity', country: 'USA', flag: '🇺🇸', iconClass: 'fas fa-lightbulb text-warning', amountMock: 125.50 },
    { name: 'Metro Water Inc.', category: 'Water', country: 'CAN', flag: '🇨🇦', iconClass: 'fas fa-water text-primary', amountMock: 42.10 },
    { name: 'ConnectTel Fiber', category: 'Internet', country: 'USA', flag: '🇺🇸', iconClass: 'fas fa-wifi text-info', amountMock: 59.99 },
    { name: 'National Gas', category: 'Gas', country: 'MEX', flag: '🇲🇽', iconClass: 'fas fa-fire text-danger', amountMock: 34.00 },
    { name: 'City Property Tax', category: 'Tax', country: 'USA', flag: '🇺🇸', iconClass: 'fas fa-landmark text-success', amountMock: 850.00 }
  ];

  filteredBillers = [...this.billers];

  // Modal State
  selectedBiller: any = null;
  paymentStep: number = 1;
  
  // Step 1: Lookup
  accountId: string = '';
  isLookingUp: boolean = false;
  lookupError: boolean = false;
  fetchedBalance: number | null = null;

  // Step 2: Payment
  paymentAmount: number = 0;
  paymentSource: string = 'wallet';

  // Step 3: Confirmation
  isProcessing: boolean = false;
  isSuccess: boolean = false;
  paymentRef: string = '';

  private countdownInterval: any;

  ngOnInit() {
    this.applyFilters();
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  clearTimers() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  setMainTab(tab: string) {
    this.activeMainTab = tab;
  }

  // --- Filtering Logic ---
  applyFilters() {
    this.filteredBillers = this.billers.filter(b => {
      const matchSearch = !this.searchQuery || 
        b.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        b.country.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchCat = !this.filterCategory || b.category === this.filterCategory;
      const matchCountry = !this.filterCountry || b.country === this.filterCountry;

      return matchSearch && matchCat && matchCountry;
    });
  }

  // --- Multi-Step Modal Logic ---
  openPaymentModal(biller: any) {
    this.selectedBiller = biller;
    this.resetModal();
  }

  resetModal() {
    this.paymentStep = 1;
    this.accountId = '';
    this.fetchedBalance = null;
    this.lookupError = false;
    this.isLookingUp = false;
    this.isProcessing = false;
    this.isSuccess = false;
    this.paymentAmount = 0;
    this.clearTimers();
  }

  lookupBalance() {
    if (!this.accountId.trim()) {
      alert("Please enter an Account/Meter ID.");
      return;
    }

    this.isLookingUp = true;
    this.lookupError = false;

    // Simulate API Call
    setTimeout(() => {
      this.isLookingUp = false;
      
      // Mock failure if ID ends in 0
      if (this.accountId.endsWith('0')) {
        this.lookupError = true;
      } else {
        // Mock success
        this.fetchedBalance = this.selectedBiller.amountMock;
        this.paymentAmount = this.fetchedBalance || 0;
        this.paymentStep = 2; // Auto-advance to details
      }
    }, 1500);
  }

  nextPaymentStep(step: number) {
    this.paymentStep = step;
  }

  processPayment() {
    if (this.paymentAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    this.paymentStep = 3;
    this.isProcessing = true;

    // Simulate API Processing
    setTimeout(() => {
      this.isProcessing = false;
      this.isSuccess = true;
      this.paymentRef = 'UTIL-' + Math.floor(10000000 + Math.random() * 90000000);
    }, 2500);
  }

  copyRef() {
    navigator.clipboard.writeText(this.paymentRef).then(() => {
      alert('Reference copied!');
    });
  }

  downloadPdf(biller: string, amount: string, date: string) {
    alert(`Simulating PDF Download for ${biller} - $${amount} on ${date}. \n(jsPDF implementation omitted for brevity in template)`);
  }
}