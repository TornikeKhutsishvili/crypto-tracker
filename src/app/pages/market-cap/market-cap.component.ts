import { CryptoService } from './../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Crypto } from '../../crypto.model';

@Component({
  selector: 'app-market-cup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './market-cap.component.html',
  styleUrls: ['./market-cap.component.css']
})
export class MarketCapComponent implements OnInit{
  cryptos: any[] = [];
  loading = true;
  sortField: string = 'market_cap';
  sortDirection: 'asc' | 'desc' = 'desc';
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private cryptoService: CryptoService,
  ) {}

  ngOnInit(): void {
    this.fetchMarketCap();
    this.cryptoService.getTopCoins().subscribe((data: Crypto[]) => {
      this.cryptos = data;
      this.sortBy('market_cap');
    });
  }

  fetchMarketCap() {
    this.loading = true;
    this.http
      .get<any>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1')
      .subscribe({
        next: (data) => {
          this.cryptos = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'desc';
    }

    this.cryptos.sort((a, b) => {
      const valA = a[this.sortField];
      const valB = b[this.sortField];

      return this.sortDirection === 'asc'
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
  }

  get filteredCryptos() {
    return this.cryptos.filter(c =>
      c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
