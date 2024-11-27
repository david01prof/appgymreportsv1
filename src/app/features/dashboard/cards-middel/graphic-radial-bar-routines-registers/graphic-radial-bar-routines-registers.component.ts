import { Component, HostListener } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-graphic-radial-bar-routines-registers',
  standalone: true,
  imports: [NgApexchartsModule, CardModule],
  templateUrl: './graphic-radial-bar-routines-registers.component.html',
  styleUrl: './graphic-radial-bar-routines-registers.component.scss',
})
export class GraphicRadialBarRoutinesRegistersComponent {
  series: number[] = [75]; // Porcentaje (ejemplo: 75%)

  public chartOptions: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartOptions();
  }
  ngOnInit() {

    this.updateChartOptions();
  }

  public updateChartOptions() {

    const windowWidth = window.innerWidth;
    const dynamicOffsetX = this.calculateOffsetX(windowWidth);

    this.chartOptions = {
      series: [76, 67],
      chart: {
        height: 200,
        with: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ['#1ab7ea', '#0084ff'],
      labels: ['Rutinas', 'Registros'],
      legend: {
        show: true,
        floating: true,
        fontSize: '14px',
        position: 'left',
        offsetX: dynamicOffsetX,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        formatter: function (seriesName: any, opts: any) {
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: true,
            },
          },
        },
      ],
    };
  }

  calculateOffsetX(width: number): number { 
    if (width < 1300) return -20; 
    if (width > 1300 && width < 2000) return -10;
    if (width > 2000 ) return 20;
    return -30;                       
  }
}
