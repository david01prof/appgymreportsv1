import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { IReport } from '@app/models';
import { NgApexchartsModule } from 'ng-apexcharts';

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
    if (this.dataReports().length > 0) {
      let dataByMonth: any[] = [0];
      this.dataReports().forEach((item) => {
        const date = new Date(item.created);
        const month = date.getMonth() + 1; // Meses comienzan en 0
        if (!dataByMonth[month]) {
          dataByMonth[month] = 0;
        }
        dataByMonth[month] += 1;
      });


      this.chartOptions = {
        series: [
          {
            name: 'Reportes',
            data: Object.values(dataByMonth),
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
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
              barHeight: '80%',
              borderRadius: 30,
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val: any) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        colors: ['#43ec0d'],
        xaxis: {
          categories: Object.keys(dataByMonth).map((date,index) => this.generateMonths(parseInt(date),[],index)),
          position: 'top',
          labels: {
            offsetY: -18,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function(val:any) {
              return val;
            }
          }
        },
        title: {
          text: "Reportes" + " " +  new Date().getFullYear(),
          floating: 0,
          offsetY: 329,
          align: "center",
          style: {
            color: "#444"
          }
        }
      };
    }
  }

  private generateMonths(
    date: number,
    labelData: string[],
    index: number
  ): string {
    let month = '';
    switch (date) {
      case 0:
        month = '';
        break;
      case 1:
        month = 'Enero';
        break;
      case 2:
        month = 'Febrero';
        break;
      case 3:
        month = 'Marzo';
        break;
      case 4:
        month = 'Abril';
        break;
      case 5:
        month = 'Mayo';
        break;
      case 6:
        month = 'Junio';
        break;
      case 7:
        month = 'Julio';
        break;
      case 8:
        month = 'Agosto';
        break;
      case 9:
        month = 'Septiembre';
        break;
      case 10:
        month = 'Octubre';
        break;
      case 11:
        month = 'Noviembre';
        break;
      case 12:
        month = 'Diciembre'
    }

    if (labelData.length == 0) {
      return month;
    } else if (labelData[index - 1] == month) {
      return '';
    }
    return month;
  }
}
