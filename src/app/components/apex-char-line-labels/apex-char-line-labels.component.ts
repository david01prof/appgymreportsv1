import { Component, input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-apex-char-line-labels',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './apex-char-line-labels.component.html',
  styleUrl: './apex-char-line-labels.component.scss'
})
export class ApexCharLineLabelsComponent {

  public dataChart = input.required<number[]>(); 
  public chartColor = input.required<string[]>();

  // Escucha el evento de cambio de tamaño
  // @HostListener('window:resize', ['$event']) onResize(event: Event) { this.chartOptions.chart.width = this.calculateWidth(); }
  
  public chartOptions:  any | undefined;

  ngOnInit(){
    this.chartOptions = {
      series: [
        {
          name: "",
          data: this.dataChart()
        }
      ],
      chart: {
        type: 'line',
        height: 80,  // Altura del gráfico dentro de la tarjeta
        width: this.calculateWidth(),    // Ancho ajustado para caber dentro de la tarjeta
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
      colors: this.chartColor(),
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
          gradientToColors: ['#FFFFFF'],  // Color final del degradado
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

  // ngOnInit(){
  //   this.chartOptions.chart.width = this.calculateWidth();
  // }

  getGradientColors(): string {
    return '#dc3545'  // Verde si es mayor, rojo si es menor
  }

  private calculateWidth(){

    if(window.innerWidth > 1294){
      return 230;
    }else if(  window.innerWidth > 1110 && window.innerWidth < 1294){
      return 220;
    }else if(window.innerWidth > 1015 && window.innerWidth <= 1110){
      return 190;
    }else if(window.innerWidth > 935 && window.innerWidth <= 1015){
      return 170;
    }else if( window.innerWidth > 406 && window.innerWidth <= 935){
      return 250;
    }else if(  window.innerWidth > 364 && window.innerWidth <= 406){
      return 220;
    }else if( window.innerWidth > 324 && window.innerWidth <= 364){
      return 200;
    }else if(window.innerWidth <= 324){
      return 150;
    }
    return 100;
  }
}
