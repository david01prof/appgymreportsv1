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
          name: "",
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
      colors: ['#FF5733'],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: {
          show: false  // Oculta las marcas de los ticks del eje X
        },  lines: {
          show: false  // Oculta la línea del eje X
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          show: false  // Oculta las etiquetas del eje Y
        },
        axisBorder: {
          show: false  // Oculta la línea del borde del eje Y
        },
        axisTicks: {
          show: false  // Oculta las marcas de los ticks del eje Y
        }
      },
      grid: { show: false },
      dataLabels: { enabled: false },
      toolbar: { show: false },
      tooltip: {
        enabled: true,
        theme: 'dark',  // Color del tema del tooltip
        shared: true,  // Muestra la información de todos los puntos sobre el gráfico
        intersect: false,  // La etiqueta del tooltip solo aparece cuando se hace hover sobre el punto
        x: {
          show: false,
        },
        y: {
          formatter: function (value: number) {
            return `Peso: ${value}`;  // Personaliza la etiqueta que muestra el tooltip
          }
        }
      }
    };
  }

  ngOnInit(){
    // this.chartOptions.colors = this.getGradientColors();
  }

  getGradientColors(): string {
    return '#dc3545'  // Verde si es mayor, rojo si es menor
  }
}
