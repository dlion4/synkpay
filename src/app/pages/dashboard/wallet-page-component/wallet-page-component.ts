import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'synckpay-wallet-page-component',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './wallet-page-component.html',
  styleUrl: './wallet-page-component.scss',
})
export class WalletPageComponent {}
