import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CryptoService } from '../../services/crypto.service';
import { TrustScorePipePipe } from '../../pipes/trust-score-pipe.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-exchanges',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TrustScorePipePipe,
    NgxPaginationModule,
  ],
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ExchangesComponent {
  exchanges: any[] = [];
  filteredExchanges: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private cryptoService: CryptoService) {
    this.cryptoService.getExchanges().subscribe(data => {
      this.exchanges = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredExchanges = this.exchanges.filter(e =>
      e.name.toLowerCase().includes(term)
    );
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilter();
  }

  get paginatedExchanges(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredExchanges.slice(start, start + this.itemsPerPage);
  }
}