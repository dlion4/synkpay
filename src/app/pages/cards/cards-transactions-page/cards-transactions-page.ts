import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards-transactions-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards-transactions-page.html',
  styleUrls: ['./cards-transactions-page.scss']
})
export class CardsTransactionsPageComponent implements OnInit {
  searchQuery: string = '';
  selectedCard: string = 'all';
  selectedCategory: string = 'all';
  dateRange: string = 'this_month';

  selectedTx: any = null;
  isDetailModalOpen: boolean = false;

  transactions = [
    {
      id: 'CTX-99201',
      date: '2026-04-28T14:30:00',
      merchant: 'Apple Store',
      location: 'New York, NY',
      category: 'Electronics',
      icon: 'bi-apple',
      amount: -1299.00,
      currency: 'USD',
      status: 'Completed',
      cardLast4: '4242',
      cardType: 'Physical',
      posType: 'Contactless',
      enrichment: {
        logo: 'https://logo.clearbit.com/apple.com',
        website: 'apple.com',
        co2: '12.4kg',
        pointsEarned: 130
      }
    },
    {
      id: 'CTX-99185',
      date: '2026-04-27T19:15:00',
      merchant: 'Netflix',
      location: 'Online',
      category: 'Entertainment',
      icon: 'bi-play-circle',
      amount: -15.99,
      currency: 'USD',
      status: 'Recurring',
      cardLast4: '1003',
      cardType: 'Virtual',
      posType: 'Digital Card Entry',
      enrichment: {
        logo: 'https://logo.clearbit.com/netflix.com',
        website: 'netflix.com',
        co2: '0.2kg',
        pointsEarned: 2
      }
    },
    {
      id: 'CTX-99150',
      date: '2026-04-26T10:00:00',
      merchant: 'Starbucks',
      location: 'Juja, KE',
      category: 'Food & Drink',
      icon: 'bi-cup-hot',
      amount: -5.50,
      currency: 'USD',
      status: 'Completed',
      cardLast4: '4242',
      cardType: 'Physical',
      posType: 'Chip & PIN',
      enrichment: {
        logo: 'https://logo.clearbit.com/starbucks.com',
        website: 'starbucks.com',
        co2: '0.8kg',
        pointsEarned: 5
      }
    }
  ];

  filteredTransactions = [...this.transactions];

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(tx => {
      const matchesSearch = tx.merchant.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            tx.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCard = this.selectedCard === 'all' || tx.cardLast4 === this.selectedCard;
      const matchesCat = this.selectedCategory === 'all' || tx.category === this.selectedCategory;
      return matchesSearch && matchesCard && matchesCat;
    });
  }

  openDetail(tx: any) {
    this.selectedTx = tx;
    this.isDetailModalOpen = true;
  }

  closeDetail() {
    this.isDetailModalOpen = false;
    this.selectedTx = null;
  }

  downloadStatement() {
    alert('Preparing your encrypted card statement for download...');
  }
}