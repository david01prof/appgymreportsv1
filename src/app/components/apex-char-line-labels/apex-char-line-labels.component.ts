import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-apex-char-line-labels',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './apex-char-line-labels.component.html',
  styleUrl: './apex-char-line-labels.component.scss'
})
export class ApexCharLineLabelsComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Ventas",
          data: [10, 30, 45, 20, 65, 50]
        }
      ],
      chart: {
        type: 'line',
        height: 100,  // Altura del gráfico dentro de la tarjeta
        width: 230,    // Ancho ajustado para caber dentro de la tarjeta
        toolbar: {
          show: false  // Oculta la barra de herramientas del gráfico
        },
        zoom: {
          enabled: false  // Deshabilita el zoom para evitar el evento pasivo
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: {
          show: false  // Oculta las marcas de los ticks del eje X
        }
      },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      dataLabels: { enabled: false },
      toolbar: { show: false }
    };
  }
}
