import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit{
  coins: any[] = [];
  isLoading = true;
  favorites: any[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.cryptoService.getTopCoins().subscribe((data: any) => {
      this.coins = data;
      this.isLoading = false;

      const savedFavorites = this.getFavoritesFromLocalStorage();
      this.favorites = savedFavorites || [];
    });
  }

  toggleFavorite(coin: any, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation(); // This will prevent any additional navigation from happening.

    const isFavorite = this.isFavorite(coin);
    if (isFavorite) {
      this.favorites = this.favorites.filter(fav => fav.id !== coin.id);
    } else {
      this.favorites.push(coin);
    }

    this.saveFavoritesToLocalStorage(this.favorites);
  }

  isFavorite(coin: any): boolean {
    return this.favorites.some(fav => fav.id === coin.id);
  }

  getFavoritesFromLocalStorage(): any[] {
    try {
      if (this.isLocalStorageAvailable()) {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
      }
      return [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  }

  saveFavoritesToLocalStorage(favorites: any[]): void {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error('localStorage is not available or accessible:', e);
      return false;
    }
  }
}