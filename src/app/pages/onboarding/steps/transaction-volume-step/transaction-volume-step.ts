import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-volume-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-volume-step.html',
  styleUrls: ['./transaction-volume-step.scss']
})
export class TransactionVolumeStepComponent {
  @Input({ required: true }) parentForm!: FormGroup;

  volumes = [
    { 
      value: 'low', 
      title: 'Low Volume', 
      desc: 'Under $1,000 / month',
      iconClass: 'bi-coin' // A single coin representing lighter activity
    },
    { 
      value: 'medium', 
      title: 'Medium Volume', 
      desc: '$1,000 – $10,000 / month',
      iconClass: 'bi-cash-stack' // A stack of cash for moderate activity
    },
    { 
      value: 'high', 
      title: 'High Volume', 
      desc: 'Over $10,000 / month',
      iconClass: 'bi-bank' // A full institution/vault for high volume
    }
  ];

  frequencies = [
    { 
      value: 'occasional', 
      title: 'Occasional', 
      desc: '1-5 times / mo',
      iconClass: 'bi-calendar-event' // A single event on a calendar
    },
    { 
      value: 'frequent', 
      title: 'Frequent', 
      desc: '5-20 times / mo',
      iconClass: 'bi-calendar-week' // A full week of activity
    },
    { 
      value: 'daily', 
      title: 'Daily', 
      desc: '20+ times / mo',
      iconClass: 'bi-lightning-charge' // Lightning bolt for fast, daily, constant action
    },
    { 
      value: 'unknown', 
      title: 'Flexible', 
      desc: 'Unlimited / Unknown',
      iconClass: 'bi-infinity' // The universal symbol for unlimited/flexible
    }
  ];
}