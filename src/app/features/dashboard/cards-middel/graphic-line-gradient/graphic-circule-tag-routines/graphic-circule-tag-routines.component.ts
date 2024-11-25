import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-graphic-circule-tag-routines',
  standalone: true,
  imports: [NgApexchartsModule, CardModule,CommonModule],
  templateUrl: './graphic-circule-tag-routines.component.html',
  styleUrl: './graphic-circule-tag-routines.component.scss',
})
export class GraphicCirculeTagRoutinesComponent {
  // Escucha el evento de cambio de tamaño
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // this.chartOptions.chart.width = this.calculateWidth();
    // console.log( this.chartOptions.chart.width);
    
    
  }
  chartOptions: any;

  constructor() {

  }

  ngAfterViewInit(){
    this.chartOptions = {
      series: [44, 55, 41, 17], // Valores para cada sección del donut
      chart: {
        type: 'donut',
        width: this.calculateWidth(), // Tamaño del gráfico
      },
      labels: ['Ventas', 'Compras', 'Marketing', 'Desarrollo'], // Etiquetas
      legend: {
        position: this.resetPositionLegend(), // Cambia la posición de la leyenda (opcional)
      },
    };
  }

  private calculateWidth(){

    if(window.innerWidth > 784){
      return 280;
    }else{
      return 300;
    }

  }

  resetPositionLegend(){
    if(window.innerWidth > 784){
      return 'bottom';
    }else{
      return 'right';
    }
  }
}
