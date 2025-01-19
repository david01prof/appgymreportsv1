import { Component, inject, input, OnChanges } from '@angular/core';
import { IReport } from '@app/models';
import { GlobalService } from '@app/services';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-graphic-line-gradient',
  standalone: true,
  imports: [CardModule, NgApexchartsModule],
  template: `
    <p-card header="Objetivo de peso" class="p-card-h-image">
      @if(chartOptions != undefined) {
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
      }
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
export class GraphicLineGradientComponent implements OnChanges {
  public reports = input.required<IReport[]>();
  public chartOptions: any | undefined;

  private readonly _globalSvc = inject(GlobalService);

  async ngOnChanges() {
    if (this.reports().length > 0) {
      var allIgc: number[] = [];
      var objetive: number[] = [];

      for (let report of this.reports()) {
        if (isNaN(report.measurement.weight)) {
          allIgc.push(0);
        } else {
          allIgc.push(report.measurement.weight);
        }

        objetive.push(this._globalSvc.userInfo().objetiveWeight);
      }

      allIgc = allIgc.reverse();

      var months = this.generateMonths();
      var maxValue = Math.max(...allIgc);
      var yAxisMax = maxValue + maxValue * 0.1;
      
      this.chartOptions = {
        series: [
          {
            name: 'Objetivo de peso',
            data: objetive, // Datos de la primera línea
          },
          {
            name: 'Peso actual',
            data: allIgc, // Datos de la segunda línea
          },
        ],
        chart: {
          type: 'line',
          height: 495,
          zoom: {
            enabled: false, // Deshabilita el zoom para evitar el evento pasivo
          },
          toolbar: {
            show: false, // Oculta la barra de herramientas de zoom y desplazamiento
          },
        },
        colors: ['#398cca', '#1fff00'], // Color sólido para la primera línea 1fff00
        stroke: {
          width: [2, 3],
          curve: 'smooth', // Suaviza las líneas
        },
        title: {
          text: '',
        },
        xaxis: {
          categories: months,
        },
        yaxis: {
          min: 0,
          max: yAxisMax,
          labels: {
            show: true, // Muestra las etiquetas del eje Y
          },
        },
        fill: {
          type: ['solid', 'gradient'], // La primera línea es sólida, la segunda tiene gradiente
          gradient: {
            shadeIntensity: 0.5,
            gradientToColors: '', // Obtiene el gradiente dinámico
            inverseColors: false,
            stops: [0, 100],
          },
        },
      };

      this.chartOptions.fill.gradient.gradientToColors =
        this.getGradientColors();
    }
  }

  // Método para generar el gradiente dinámico en función del valor
  private getGradientColors(): string[] {
    let  x = [];
    for(let serie of this.chartOptions.series[1].data){
      for (let obj of this.chartOptions.series[1].data){
        const difference = Math.abs(serie - obj);
        if (difference === 0) {
          x.push('#dc3545')
        }else if(difference < 3){
          x.push('#28a745')
        }else{
          x.push('#dc3545')
        }
      }
    }
    console.log(x);
    
    return x;
  }

  private generateMonths(){
    var months : string[] = [];
    for(let report of this.reports()){
      const date = new Date(report.created).getMonth();
      switch(date){
        case 0:
          months.push('Enero'); break;
        case 1:
          months.push('Febrero'); break;
        case 2:
          months.push('Marzo'); break;
        case 3:
          months.push('Abril'); break;
        case 4:
          months.push('Mayo'); break;
        case 5:
          months.push('Junio'); break;
        case 6:
          months.push('Julio'); break;
        case 7:
          months.push('Agosto'); break;
        case 8:
          months.push('Septiembre'); break;
        case 9:
          months.push('Octubre'); break;
        case 10:
          months.push('Noviembre'); break;
        case 11:
          months.push('Diciembre'); break;
      }

    }
    return months;
  }
}
