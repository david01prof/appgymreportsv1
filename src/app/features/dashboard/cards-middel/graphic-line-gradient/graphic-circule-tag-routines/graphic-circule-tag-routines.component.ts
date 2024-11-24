import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-graphic-circule-tag-routines',
  standalone: true,
  imports: [NgApexchartsModule,CardModule],
  templateUrl: './graphic-circule-tag-routines.component.html',
  styleUrl: './graphic-circule-tag-routines.component.scss'
})
export class GraphicCirculeTagRoutinesComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 41, 17],  // Valores para cada sección del donut
      chart: {
        type: 'donut',
        width: 380  // Tamaño del gráfico
      },
      labels: ['Ventas', 'Compras', 'Marketing', 'Desarrollo'], // Etiquetas
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }
}
