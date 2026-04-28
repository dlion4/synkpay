import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout';
import { KycPageComponent } from './pages/compliance/kyc-page/kyc-page';
import { KybPageComponent } from './pages/compliance/kyb-page/kyb-page';
// ... other imports aaap
// a
import { SalesPageComponent } from './pages/performance/sales-page/sales-page';
import { StatementsPageComponent } from './pages/performance/statements-page/statements-page';
import { ValuationPageComponent } from './pages/performance/valuation-page/valuation-page';

import { WalletSoloaccountPageComponent } from './pages/wallet/wallet-soloaccount-page/wallet-soloaccount-page';
import { WalletSharedaccountPageComponent } from './pages/wallet/wallet-sharedaccount-page/wallet-sharedaccount-page';
import { WalletTokensPageComponent } from './pages/wallet/wallet-tokens-page/wallet-tokens-page';
import { WalletReferralsPageComponent } from './pages/wallet/wallet-referrals-page/wallet-referrals-page';

import { SendMoneyPageComponent } from './pages/payment-hub/send-money-page/send-money-page';
import { ReceiveMoneyPageComponent } from './pages/payment-hub/receive-money-page/receive-money-page';
import { RecurringPageComponent } from './pages/payment-hub/recurring-page/recurring-page';
import { TransfersPageComponent } from './pages/payment-hub/transfers-page/transfers-page';
import { UtilitiesPageComponent } from './pages/payment-hub/utilities-page/utilities-page';
import { AirtimeDataPageComponent } from './pages/payment-hub/airtime-data-page/airtime-data-page';
import { DisputesPageComponent } from './pages/payment-hub/disputes-page/disputes-page';
import { TransactionsPageComponent } from './pages/payment-hub/transactions-page/transactions-page';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layouts/base-layout/base-layout').then(m => m.BaseLayout)
        ,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home-page-component/home-page-component').then(m => m.HomePageComponent)
            },
            {
                path: 'about',
                loadComponent: () =>
                    import('./pages/about-page-component/about-page-component').then(m => m.AboutPageComponent)
            }
        ]

    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./layouts/dashboard-layout/dashboard-layout').then(m => m.DashboardLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/dashboard/dashboard-page-component/dashboard-page-component').then(m => m.DashboardPageComponent)
            },
            {
                path: 'wallet',
                loadComponent: () =>
                    import('./pages/dashboard/wallet-page-component/wallet-page-component').then(m => m.WalletPageComponent),
                children: [
                    {

                        path: 'soloaccount',
                        loadComponent: () =>
                            import('./pages/dashboard/wallet/wallet-soloaccount-page-component/wallet-soloaccount-page-component').then(m => m.WalletSoloaccountPageComponent)
                    }
                ]
            }
        ]


    },
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            // ... theeee other dashboard routes
            { path: 'compliance/kyc', component: KycPageComponent },
            { path: 'compliance/kyb', component: KybPageComponent },

            // perfomance pages
            { path: 'performance/sales', component: SalesPageComponent },
            { path: 'performance/statements', component: StatementsPageComponent },
            { path: 'performance/valuation', component: ValuationPageComponent },

            // walettt pages
            { path: 'wallet/accounts', component: WalletSoloaccountPageComponent },
            { path: 'wallet/sharedaccount', component: WalletSharedaccountPageComponent },
            { path: 'wallet/tokens', component: WalletTokensPageComponent },
            { path: 'wallet/referrals', component: WalletReferralsPageComponent },

            // payments pages not yet
            { path: 'payment-hub/send-money', component: SendMoneyPageComponent },
            { path: 'payment-hub/receive-money', component: ReceiveMoneyPageComponent },
            { path: 'payment-hub/recurring', component: RecurringPageComponent },
            { path: 'payment-hub/transfers', component: TransfersPageComponent },
            { path: 'payment-hub/utilities', component: UtilitiesPageComponent },
            { path: 'payment-hub/airtime-data', component: AirtimeDataPageComponent },
            { path: 'payment-hub/disputes', component: DisputesPageComponent },
            { path: 'payment-hub/transactions', component: TransactionsPageComponent },
        ]
    },


];



