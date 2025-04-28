import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { Chart, LinearScale } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(LinearScale);

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.css']
})
export class CryptoDetailComponent implements OnInit {

  coin: any;
  chart: any;

  constructor(private route: ActivatedRoute, private cryptoService: CryptoService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.cryptoService.getCoinById(id).subscribe((data) => {
        this.coin = data;

        setTimeout(() => {
          this.loadChart(id);
        }, 0);
      });
    }
  }

  loadChart(id: string): void {
    this.cryptoService.getCoinChart(id).subscribe((data: any) => {
      if (data && data.prices) {
        const prices = data.prices.map((p: any) => p[1]);
        const labels = data.prices.map((p: any) =>
          new Date(p[0]).toLocaleDateString()
        );

        const canvas = document.getElementById('coinChart') as HTMLCanvasElement;

        if (canvas) {
          this.chart = new Chart(canvas, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Price (7d)',
                  data: prices,
                  borderColor: '#007bff',
                  tension: 0.3,
                  fill: false,
                  borderWidth: 2
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top'
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem: any) {
                      return `$${(tooltipItem.raw as number).toFixed(2)}`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    callback: function (value: any) {
                      return `$${(value as number).toFixed(2)}`;
                    }
                  }
                }
              }
            }
          });
        }
      }
    });
  }
}
