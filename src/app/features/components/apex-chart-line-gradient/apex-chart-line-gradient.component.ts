import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  NgApexchartsModule
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-apex-chart-line-gradient',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './apex-chart-line-gradient.component.html',
  styleUrl: './apex-chart-line-gradient.component.scss'
})
export class ApexChartLineGradientComponent {

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
        height: 350,
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
