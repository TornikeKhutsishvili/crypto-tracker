import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Crypto } from '../crypto.model';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private baseUrl = 'https://api.coingecko.com/api/v3';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getCoinById(id: string) {
    if (!this.isBrowser || typeof window === 'undefined') {
      return EMPTY;
    }
    return this.http
      .get(`${this.baseUrl}/coins/${id}`)
      .pipe(take(1));
  }

  getCoinChart(id: string) {
    if (!this.isBrowser || typeof window === 'undefined') {
      return EMPTY;
    }
    return this.http
      .get(`${this.baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=7`)
      .pipe(take(1));
  }


  getTopCoins(): Observable<Crypto[]> {
    if (!this.isBrowser || typeof window === 'undefined') {
      return EMPTY;
    }
    return this.http
      .get<Crypto[]>(`${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`)
      .pipe(take(1));
  }


  getExchanges(): Observable<any[]> {
    if (!this.isBrowser || typeof window === 'undefined') {
      return EMPTY;
    }
    return this.http
      .get<any[]>(`${this.baseUrl}/exchanges`)
      .pipe(take(1));
  }
}