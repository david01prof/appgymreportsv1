import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-graphic-line-gradient',
  standalone: true,
  imports: [CardModule, NgApexchartsModule],
  template: `
    <p-card header="Objetivo de peso" class="p-card-h-image">
        <apx-chart
          [series]="chartOptions.series"
          [chart]="chartOptions.chart"
          [stroke]="chartOptions.stroke"
          [colors]="chartOptions.colors"
          [fill]="chartOptions.fill"
          [title]="chartOptions.title"
          [xaxis]="chartOptions.xaxis"
          [yaxis]="chartOptions.yaxis"
        >
        </apx-chart>
    </p-card>
  `,
  styles: `

    ::ng-deep .p-card-h-image .p-card{
      max-width: 1000%;
    }
    ::ng-deep .apexcharts-canvas {
      border-radius: 6px;
    }

    ::ng-deep .p-card-h-image{
      width: 100%;
      display:block
    }
  `,
})
export class GraphicLineGradientComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Objetivo de peso',
          data: [60,60,60,60,60,60,60, 60]  // Datos de la primera línea
        },
        {
          name: 'Peso actual',
          data: [5, 15, 25, 20, 30, 45, 80, 55]   // Datos de la segunda línea
        }
      ],
      chart: {
        type: 'line',
        height: 400,
        zoom: {
          enabled: false  // Deshabilita el zoom para evitar el evento pasivo
        },
        toolbar: {
          show: false  // Oculta la barra de herramientas de zoom y desplazamiento
        }
      },
      colors: ['#398cca','#1fff00'],  // Color sólido para la primera línea 1fff00
      stroke: {
        width: [2, 3],
        curve: 'smooth'   // Suaviza las líneas
      },
      title: {
        text: ''
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago']
      },
      yaxis: {
        labels: {
          show: true  // Muestra las etiquetas del eje Y
        }
      },
      fill: {
        type: ['solid', 'gradient'],  // La primera línea es sólida, la segunda tiene gradiente
        gradient: {
          shadeIntensity: 0.5,
          gradientToColors:'#1fff00',  // Obtiene el gradiente dinámico
          inverseColors: false,
          stops: [0, 100],
        }
      }
    };
  }

  ngOnInit(){
    this.chartOptions.fill.gradient.gradientToColors = this.getGradientColors();
  }

  // Método para generar el gradiente dinámico en función del valor
  getGradientColors(): string[] {
    const threshold = this.chartOptions.series[0];  // Valor de referencia para cambiar de color
    return this.chartOptions.series[1].data.map((value: number) =>
      value > threshold ? '#28a745' : '#dc3545'  // Verde si es mayor, rojo si es menor
    );
  }
}
