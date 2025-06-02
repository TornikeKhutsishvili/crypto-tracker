import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./pages/crypto-list/crypto-list.component').then((m) => m.CryptoListComponent)
  },

  { path: 'home',
    loadComponent: () => import('./pages/crypto-list/crypto-list.component').then((m) => m.CryptoListComponent)
  },

  { path: 'crypto/:id',
    loadComponent: () => import('./pages/crypto-detail/crypto-detail.component').then((m) => m.CryptoDetailComponent),
    data: {
      getPrerenderParams: () => {
        return [
          { id: 'bitcoin' },
          { id: 'ethereum' },
          { id: 'tether' },
          { id: 'xrp' },
          { id: 'bnb' },
          { id: 'solana' },
          { id: 'usdc' },
          { id: 'dogecoin' },
          { id: 'cardano' },
          { id: 'tron' },
          { id: 'lido stacked ether' },
          { id: 'wrapped bitcoin' },
          { id: 'sui' },
          { id: 'chainlink' },
          { id: 'avalanche' },
          { id: 'leo token' },
          { id: 'stellar' },
          { id: 'toncoin' },
          { id: 'shiba inu' },
          { id: 'hedera' }
        ];
      }
    }
  },

  { path: 'register',
    loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent)
  },

  { path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
  },

  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard]
  },

  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
    canActivate: [authGuard]
  },

  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
    canActivate: [authGuard]
  },

  {
    path: 'market-cap',
    loadComponent: () => import('./pages/market-cap/market-cap.component').then(m => m.MarketCapComponent)
  },

  { path: 'exchanges',
    loadComponent: () => import('./pages/exchanges/exchanges.component').then(m => m.ExchangesComponent)
  },

  { path: 'most-visited',
    loadComponent: () => import('./pages/most-visited/most-visited.component').then(m => m.MostVisitedComponent)
  },

  { path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '' },
];
