import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-purpose-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purpose-step.html',
  styleUrls: ['./purpose-step.scss']
})
export class PurposeStepComponent {
  @Input({ required: true }) parentForm!: FormGroup;

 goals = [
    { 
      value: 'savings', 
      title: 'Personal Savings', 
      desc: 'Building an emergency fund or long-term wealth.',
      iconClass: 'bi-wallet2' // A classic wallet for personal funds
    },
    { 
      value: 'daily', 
      title: 'Daily Expenses', 
      desc: 'Handling rent, groceries, and everyday bills.',
      iconClass: 'bi-cart3' // Shopping cart for groceries and daily spending
    },
    { 
      value: 'investments', 
      title: 'Investments', 
      desc: 'Trading stocks, crypto, or mutual funds.',
      iconClass: 'bi-graph-up-arrow' // The universal symbol for market growth
    },
    { 
      value: 'business', 
      title: 'Business/Freelance', 
      desc: 'Receiving client payments and managing professional expenses.',
      iconClass: 'bi-shop' // A storefront representing business operations
    }
  ];
}