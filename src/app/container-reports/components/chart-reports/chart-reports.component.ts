import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  ViewChild,
} from '@angular/core';
import { IReport } from '@app/models';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | null;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-chart-reports',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './chart-reports.component.html',
  styleUrl: './chart-reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartReportsComponent {
  dataReports = input.required<IReport[]>();

  public chartOptions: any | null;

  ngOnChanges() {
    console.log(this.dataReports());
    if (this.dataReports().length > 0) {
      let data :number[]= [];
      let labelData : string[] = [];
      for (let i = 0; i < this.dataReports().length; i++) {
        const date = new Date(this.dataReports()[i].created);   
        data.push(1);     
        labelData.push(this.generateMonths(date.getMonth(),labelData,i)!);
      }
      console.log('df');
      this.generateChart(data,labelData);
    }
  }

  private generateChart(data: number[],labelData: string[]) {
    this.chartOptions = {
      series: [
        {
          name: 'Reportes',
          data: data,
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        zoom: {
          enabled: false, // Deshabilita el zoom para evitar el evento pasivo
        },
        toolbar: {
          show: false, // Oculta la barra de herramientas de zoom y desplazamiento
        },
      },
      colors: ['#28a745'], // 
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: labelData,
      },
      yaxis: {
        min: 0,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }

  private generateMonths(date: number,labelData: string[],index: number): string {
    let month = '';
      switch (date) {
        case 0:
          month = ('Enero');
          break;
        case 1:
          month = ('Febrero');
          break;
        case 2:
          month = ('Marzo');
          break;
        case 3:
          month = ('Abril');
          break;
        case 4:
          month = ('Mayo');
          break;
        case 5:
          month = ('Junio');
          break;
        case 6:
          month = ('Julio');
          break;
        case 7:
          month = ('Agosto');
          break;
        case 8:
          month = ('Septiembre');
          break;
        case 9:
          month = ('Octubre');
          break;
        case 10:
          month = ('Noviembre');
          break;
        case 11:
          month = ('Diciembre');
      }

      if(labelData.length == 0){
        return (month);
      }else if(labelData[index -1 ] == month){
        return ('');
      }
      return (month);
  }
}
