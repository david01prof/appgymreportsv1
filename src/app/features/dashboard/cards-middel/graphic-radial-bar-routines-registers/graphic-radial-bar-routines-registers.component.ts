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
        position: "right",
        offsetX: this.calculateLeftLegend(),
        offsetY: 10,
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

  private calculateLeftLegend(){

    if(window.innerWidth <= 1020){
      return 80;
    }else if( window.innerWidth > 1020 && window.innerWidth <= 1206){
      return 90;
    }else if( window.innerWidth > 1206 &&  window.innerWidth <= 1368){
      return 110;
    }else if( window.innerWidth > 1368 &&  window.innerWidth <= 1549){
      return 130;
    }else if (window.innerWidth > 1549){
      return 150;
    }
    return 0;
  }
}
