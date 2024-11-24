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
        height: 79,  // Altura del gráfico dentro de la tarjeta
        width: 230,    // Ancho ajustado para caber dentro de la tarjeta
        toolbar: {
          show: false  // Oculta la barra de herramientas del gráfico
        },
        zoom: {
          enabled: false  // Deshabilita el zoom para evitar el evento pasivo
        },
        animations: {
          enabled: true,
          easing: 'linear',
          speed: 1500,    // Velocidad de la animación
          animateGradually: {
            enabled: false
          },
          dynamicAnimation: {
            enabled: true,
            speed: 1000    // Velocidad del efecto dinámico
          }
        }
      },
      colors: ['#FF5733'],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',  // Define un degradado
        gradient: {
          shade: 'light',
          type: 'horizontal',  // Gradiente de izquierda a derecha
          shadeIntensity: 0.5,
          gradientToColors: ['#FF4560'],  // Color final del degradado
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.5,
          stops: [0, 100]  // Inicio y fin del gradiente
        }
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
    this.chartOptions.chart.width = this.calculateWidth();
    this.chartOptions.chart.height = this.calculateHeight();
  }

  getGradientColors(): string {
    return '#dc3545'  // Verde si es mayor, rojo si es menor
  }

  private calculateWidth(){
    if(window.innerWidth > 767){
      return 170;
    }else{
      return 100;
    }
  }
  private calculateHeight(){
    if(window.innerWidth > 767){
      return 80;
    }else{
      return 230;
    }
  }
}
