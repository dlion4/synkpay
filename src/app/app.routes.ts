import { Routes } from '@angular/router';
import { authenticationGuard } from './guards/auth/authentication-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/base-layout/base-layout').then((m) => m.BaseLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page-component/home-page-component').then(
            (m) => m.HomePageComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about-page-component/about-page-component').then(
            (m) => m.AboutPageComponent,
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayoutComponent),
    canActivate: [/* AuthGuard */ authenticationGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard-page-component/dashboard-page-component').then(
            (m) => m.DashboardPageComponent,
          ),
      },
      {
        path: 'compliance',
        loadComponent: () =>
          import('./layouts/dashboard-layout/compliance/dashboard-compliance-layout').then(
            (m) => m.DashboardComplianceLayoutComponent,
          ),
        children: [
          {
            path: 'kyc',
            loadComponent: () =>
              import('./pages/compliance/kyc-page/kyc-page').then((m) => m.KycPageComponent),
          },
          {
            path: 'kyb',
            loadComponent: () =>
              import('./pages/compliance/kyb-page/kyb-page').then((m) => m.KybPageComponent),
          },
        ],
      },
      {
        path: 'performance',
        loadComponent: () =>
          import('./layouts/dashboard-layout/performance/performance-dashboard-layout-component').then(
            (m) => m.DashboardPerformanceLayoutComponent,
          ),
        children: [
          {
            path: 'sales',
            loadComponent: () =>
              import('./pages/performance/sales-page/sales-page').then((m) => m.SalesPageComponent),
          },
          {
            path: 'statements',
            loadComponent: () =>
              import('./pages/performance/statements-page/statements-page').then(
                (m) => m.StatementsPageComponent,
              ),
          },
          {
            path: 'valuation',
            loadComponent: () =>
              import('./pages/performance/valuation-page/valuation-page').then(
                (m) => m.ValuationPageComponent,
              ),
          },
        ],
      },
      {
        path: 'wallet',
        loadComponent: () =>
          import('./layouts/dashboard-layout/wallet/dashboard-wallet-layout-component').then(
            (m) => m.DashboardWalletLayoutComponent,
          ),
        children: [
          {
            path: 'accounts',
            loadComponent: () =>
              import('./pages/wallet/wallet-soloaccount-page/wallet-soloaccount-page').then(
                (m) => m.WalletSoloAccountPageComponent,
              ),
          },
          {
            path: 'shared-account',
            loadComponent: () =>
              import('./pages/wallet/wallet-sharedaccount-page/wallet-sharedaccount-page').then(
                (m) => m.WalletSharedAccountPageComponent,
              ),
          },
          {
            path: 'tokens',
            loadComponent: () =>
              import('./pages/wallet/wallet-tokens-page/wallet-tokens-page').then(
                (m) => m.WalletTokensPageComponent,
              ),
          },
          {
            path: 'referrals',
            loadComponent: () =>
              import('./pages/wallet/wallet-referrals-page/wallet-referrals-page').then(
                (m) => m.WalletReferralsPageComponent,
              ),
          },
        ],
      },
      {
        path: 'payment-hub',
        loadComponent: () =>
          import('./layouts/dashboard-layout/payment-hub/payment-hub-dashboard-layout-component').then(
            (m) => m.DashboardPaymentHubLayoutComponent,
          ),
        children: [
          {
            path: 'send-money',
            loadComponent: () =>
              import('./pages/payment-hub/send-money-page/send-money-page').then(
                (m) => m.SendMoneyPageComponent,
              ),
          },
          {
            path: 'receive-money',
            loadComponent: () =>
              import('./pages/payment-hub/receive-money-page/receive-money-page').then(
                (m) => m.ReceiveMoneyPageComponent,
              ),
          },
          {
            path: 'recurring',
            loadComponent: () =>
              import('./pages/payment-hub/recurring-page/recurring-page').then(
                (m) => m.RecurringPageComponent,
              ),
          },
          {
            path: 'transfers',
            loadComponent: () =>
              import('./pages/payment-hub/transfers-page/transfers-page').then(
                (m) => m.TransfersPageComponent,
              ),
          },
          {
            path: 'utilities',
            loadComponent: () =>
              import('./pages/payment-hub/utilities-page/utilities-page').then(
                (m) => m.UtilitiesPageComponent,
              ),
          },
          {
            path: 'airtime-data',
            loadComponent: () =>
              import('./pages/payment-hub/airtime-data-page/airtime-data-page').then(
                (m) => m.AirtimeDataPageComponent,
              ),
          },
          {
            path: 'disputes',
            loadComponent: () =>
              import('./pages/payment-hub/disputes-page/disputes-page').then(
                (m) => m.DisputesPageComponent,
              ),
          },
          {
            path: 'transactions',
            loadComponent: () =>
              import('./pages/payment-hub/transactions-page/transactions-page').then(
                (m) => m.TransactionsPageComponent,
              ),
          },
        ],
      },
      {
        path: 'cards',
        loadComponent: () =>
          import('./layouts/dashboard-layout/card/card-dashboard-layout-component').then(
            (m) => m.DashboardCardLayoutComponent,
          ),
        children: [
          {
            path: 'my-cards',
            loadComponent: () =>
              import('./pages/cards/cards-page/cards-page').then((m) => m.CardsPageComponent),
          },
          {
            path: 'limits-security',
            loadComponent: () =>
              import('./pages/cards/limits-security-page/limits-security-page').then(
                (m) => m.LimitsSecurityPageComponent,
              ),
          },
          {
            path: 'transactions',
            loadComponent: () =>
              import('./pages/cards/cards-transactions-page/cards-transactions-page').then(
                (m) => m.CardsTransactionsPageComponent,
              ),
          },
        ],
      },
      {
        path: 'legacy',
        loadComponent: () =>
          import('./layouts/dashboard-layout/legacy/legacy-dashboard-layout-component').then(
            (m) => m.DashboardLegacyLayoutComponent,
          ),
        children: [
          {
            path: 'beneficiary',
            loadComponent: () =>
              import('./pages/legacy/beneficiary-page/beneficiary-page').then(
                (m) => m.BeneficiaryPageComponent,
              ),
          },
          {
            path: 'continuity-saving',
            loadComponent: () =>
              import('./pages/legacy/continuity-saving-page/continuity-saving-page').then(
                (m) => m.ContinuitySavingPageComponent,
              ),
          },
        ],
      },
      {
        path: 'support',
        loadComponent: () =>
          import('./layouts/dashboard-layout/support/support-dashboard-layout-component').then(
            (m) => m.DashboardSupportLayoutComponent,
          ),
        children: [
          {
            path: 'overview',
            loadComponent: () =>
              import('./pages/support/support-center/support-center').then(
                (m) => m.SupportCenterComponent,
              ),
          },
          {
            path: 'help',
            loadComponent: () =>
              import('./pages/support/help-center/help-center').then((m) => m.HelpCenterComponent),
          },
          {
            path: 'live-chat',
            loadComponent: () =>
              import('./pages/support/live-chat/live-chat').then((m) => m.LiveChatComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then((m) => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in').then((m) => m.SignInComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up').then((m) => m.SignUpComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/auth/reset-password/reset-password').then(
            (m) => m.ResetPasswordComponent,
          ),
      },
      {
        path: 'new-password',
        loadComponent: () =>
          import('./pages/auth/new-password/new-password').then((m) => m.NewPasswordComponent),
      },
      {
        path: 'two-factor',
        loadComponent: () =>
          import('./pages/auth/two-factor/two-factor').then((m) => m.TwoFactorComponent),
      },
    ],
  },
  {
  path: 'onboarding',
  loadComponent: () => import('./layouts/onboarding-layout/onboarding-layout').then(m => m.OnboardingLayoutComponent),
  canActivate: [authenticationGuard], 
  children: [
    {
      path: '',
      loadComponent: () => import('./pages/onboarding/onboarding-flow/onboarding-flow').then(m => m.OnboardingFlowComponent)
    }
  ]
},
];
