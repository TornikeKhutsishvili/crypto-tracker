import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { Crypto } from '../../crypto.model';

@Component({
  selector: 'app-most-visited',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './most-visited.component.html',
  styleUrls: ['./most-visited.component.css']
})
export class MostVisitedComponent implements OnInit {
  mostVisited: Crypto[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getTopCoins().subscribe((data: Crypto[]) => {
      this.mostVisited = data;
    });
  }
}