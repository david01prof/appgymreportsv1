import { Component, DestroyRef, inject, input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CardModule } from 'primeng/card';
import * as shape from 'd3-shape';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IRoutine } from '../../features/routines/interfaces/iroutine';
import { RoutinesService } from '../../features/routines/services/routines.service';

@Component({
  selector: 'app-chart-linear',
  standalone: true,
  imports: [NgxChartsModule, CardModule],
  template: `
    <p-card>
      <!-- <div class="shadow-4 p-2 border-round-xs"> -->

      <ngx-charts-line-chart
        (window:resize)="onResize($event)"
        [view]="view"
        [scheme]="colorScheme"
        [results]="lineChartData"
        [gradient]="false"
        [xAxis]="true"
        [yAxis]="true"
        [legend]="true"
        [legendPosition]="legendPosition"
        [showXAxisLabel]="true"
        [showYAxisLabel]="false"
        [xAxisLabel]="'Meses'"
        [yAxisLabel]="'Valores'"
        [timeline]="false"
        [animations]="true"
        [roundDomains]="true"
        [showGridLines]="true"
        [autoScale]="true"
        [curve]="curve"
      >
      </ngx-charts-line-chart>

      <div class="espaciado"></div>
      <!-- </div> -->
    </p-card>
  `,
  styles: `
    .espaciado{
      height: 60px
    }
  `,
})
export class ChartLinearComponent {
  public objetiveWeight = input.required<number>();

  // Opciones para el gráfico
  public view: [number, number] = [700, 400]; // Tamaño del gráfico
  public legendPosition: any = 'below';
  public curve = shape.curveBasis;

  public colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: '',
    selectable: false,
    group: ScaleType.Linear,
  };

  constructor() {
    this.view = [window.innerWidth / 1.1, 400];
  }

  // Datos para el gráfico
  lineChartData = [
    {
      name: 'Peso Objetivo',
      series: [
        {
          name: '2023-01',
          value: 78,
        },
        {
          name: '2023-02',
          value: 78,
        },
        {
          name: '2023-03',
          value: 78,
        },
        {
          name: '2023-04',
          value: 78,
        },
        {
          name: '2023-05',
          value: 78,
        },
      ],
    },
    {
      name: 'Peso actual',
      series: [
        {
          name: '2023-01',
          value: 70,
        },
        {
          name: '2023-02',
          value: 73,
        },
        {
          name: '2023-03',
          value: 75,
        },
        {
          name: '2023-04',
          value: 85,
        },
        {
          name: '2023-04',
          value: 79,
        },
      ],
    },
  ];

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.1, 400];
  }
}
