import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { CryptoListComponent } from './pages/crypto-list/crypto-list.component';
import { CryptoDetailComponent } from './pages/crypto-detail/crypto-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '',  component: CryptoListComponent},
  { path: 'crypto/:id', component: CryptoDetailComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'market-cap',
    loadComponent: () => import('./pages/market-cap/market-cap.component').then(m => m.MarketCapComponent),
    canActivate: [authGuard]
  },
  { path: 'exchanges',
    loadComponent: () => import('./pages/exchanges/exchanges.component').then(m => m.ExchangesComponent),
    canActivate: [authGuard]
  },
  { path: 'most-visited',
    loadComponent: () => import('./pages/most-visited/most-visited.component').then(m => m.MostVisitedComponent),
    canActivate: [authGuard]
  },
  { path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }, // should be last
];
