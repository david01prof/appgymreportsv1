import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-graphic-radial-bar-routines-registers',
  standalone: true,
  imports: [NgApexchartsModule,CardModule],
  templateUrl: './graphic-radial-bar-routines-registers.component.html',
  styleUrl: './graphic-radial-bar-routines-registers.component.scss'
})
export class GraphicRadialBarRoutinesRegistersComponent {
  series: number[] = [75]; // Porcentaje (ejemplo: 75%)

  public chartOptions: any;

  ngOnInit(){
    this.chartOptions = {
      series: [76, 67],
      chart: {
        height: 200,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff"],
      labels: ["Rutinas", "Registros"],
      legend: {
        show: true,
        floating: true,
        fontSize: "14px",
        position: "left",
        offsetX: 30,
        offsetY: 40,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName:any, opts:any) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }
}
