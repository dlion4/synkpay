import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-valuation-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valuation-page.html',
  styleUrls: ['./valuation-page.scss']
})
export class ValuationPageComponent implements OnInit, OnDestroy {
  // Tab Management
  activeTab: string = 'cashFlowSec';
  
  // Live Audit Clock
  currentTime: string = new Date().toLocaleTimeString('en-US');
  private timer: any;

  // Simulator Form State (Two-way bound)
  sim = {
    months: 12,
    region: 1.5,
    clients: 1250,
    growth: 45,
    arpu: 15,
    subRate: 35,
    service: 12500,
    ads: 8400
  };

  // Simulator Results State
  res = {
    valuation: '0.00',
    cashflow: '0',
    months: 12,
    multiplier: '0.0'
  };

  // Dynamic Data for Channels Table
  channels = [
    { name: 'Web Gateway', region: 'Nigeria / West', gross: '$420,000', net: '+$310,000', netClass: 'text-success', proj: '$445K', icon: 'fa-globe', iconClass: 'text-primary', bgClass: 'bg-light-primary' },
    { name: 'POS Terminals', region: 'Kenya / East', gross: '$180,000', net: '+$142,000', netClass: 'text-success', proj: '$210K', icon: 'fa-calculator', iconClass: 'text-success', bgClass: 'bg-light-success' },
    { name: 'STK Push (Mobile)', region: 'Global Routing', gross: '$94,000', net: '-$12,000', netClass: 'text-danger', proj: '$105K', icon: 'fa-mobile-alt', iconClass: 'text-warning-dark', bgClass: 'bg-light-warning' }
  ];

  ngOnInit() {
    // Start the live clock for the Audit Modal
    this.timer = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString('en-US');
    }, 1000);
  }

  ngOnDestroy() {
    // Clean up the timer to prevent memory leaks
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setTab(tabName: string) {
    this.activeTab = tabName;
  }

  calculateValuation() {
    // 1. Projection Logic
    const totalNewClients = this.sim.growth * 4 * this.sim.months;
    const finalClientCount = this.sim.clients + totalNewClients;
    
    // 2. Calculate Monthly Cash Flow
    const subRateDec = this.sim.subRate / 100;
    const subscriptionRev = finalClientCount * subRateDec * this.sim.arpu;
    const transactionalRev = finalClientCount * (1 - subRateDec) * (this.sim.arpu * 0.4); 
    const extraRevenue = this.sim.service + this.sim.ads;
    
    const totalMonthlyCashflow = subscriptionRev + transactionalRev + extraRevenue;
    
    // 3. Valuation Formula (ARR * Revenue Multiple * Region Factor)
    const annualRevenue = totalMonthlyCashflow * 12;
    const baseMultiple = 4.5; 
    const finalValuation = annualRevenue * baseMultiple * this.sim.region;

    // 4. Set Results
    this.res.valuation = (finalValuation / 1000000).toFixed(2);
    this.res.cashflow = totalMonthlyCashflow.toLocaleString(undefined, {maximumFractionDigits: 0});
    this.res.months = this.sim.months;
    this.res.multiplier = (baseMultiple * this.sim.region).toFixed(1);
  }
}