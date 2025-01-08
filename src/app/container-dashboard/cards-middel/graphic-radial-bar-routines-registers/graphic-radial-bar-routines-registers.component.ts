import { Component, input } from '@angular/core';
import { IReport, IRoutine } from '@app/models';
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

  routines = input.required<IRoutine[]>();
  reports = input.required<IReport[]>();
  
  public chartOptions: any | undefined;

  get windowRef(): Window | null {
    return typeof window !== 'undefined' ? window : null;
  }
  
  ngOnChanges() {

    const myWindow = this.windowRef;
    if (myWindow) {
      
      const dynamicOffsetX = this.calculateOffsetX(window.innerWidth);

      this.chartOptions = {
        series: [this.reports().length, this.routines().length],
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
        labels: ['Registros', 'Rutinas'],
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


  }

  private calculateOffsetX(width: number): number { 
    if (width < 1300) return -20; 
    if (width > 1300 && width < 2000) return -10;
    if (width > 2000 ) return 20;
    return -30;                       
  }
}
