import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent:()=> 
        import('./layouts/base-layout/base-layout').then(m => m.BaseLayout)
        ,
        children: [
            {
                path: '',
                loadComponent:()=> 
                import('./pages/home-page-component/home-page-component').then(m => m.HomePageComponent)
            },
            {
                path: 'about',
                loadComponent:()=> 
                import('./pages/about-page-component/about-page-component').then(m => m.AboutPageComponent)
            }
        ]
        
    },
    {
        path: 'dashboard',
        loadComponent:()=> 
        import('./layouts/dashboard-layout/dashboard-layout').then(m => m.DashboardLayoutComponent),
        children: [
            {
                path: '',
                loadComponent:()=> 
                import('./pages/dashboard/dashboard-page-component/dashboard-page-component').then(m => m.DashboardPageComponent)
            },
            {
                path: 'wallet',
                loadComponent:()=> 
                import('./pages/dashboard/wallet-page-component/wallet-page-component').then(m => m.WalletPageComponent),
                children: [
                    {

                        path: 'soloaccount',
                        loadComponent:()=> 
                        import('./pages/dashboard/wallet/wallet-soloaccount-page-component/wallet-soloaccount-page-component').then(m => m.WalletSoloaccountPageComponent)
                    }
                ]
            }
        ]


    }

];
