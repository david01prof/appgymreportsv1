import { Component, input } from '@angular/core';
import { IReport, IRoutine } from '@app/models';
import { CardModule } from 'primeng/card';
import { GraphicCirculeTagRoutinesComponent } from './graphic-circule-tag-routines/graphic-circule-tag-routines.component';
import { GraphicLineGradientComponent } from './graphic-line-gradient/graphic-line-gradient.component';
import { GraphicRadialBarRoutinesRegistersComponent } from './graphic-radial-bar-routines-registers/graphic-radial-bar-routines-registers.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-middel',
  standalone: true,
  imports: [
    CardModule,
    GraphicLineGradientComponent,
    GraphicCirculeTagRoutinesComponent,
    GraphicRadialBarRoutinesRegistersComponent,
    CommonModule
  ],
  styleUrls: ['./cards-middel.component.scss'],
  template: `
    <div class="cardsGraphicMiddels overflow-hidden fadein animation-duration-1000">
      <app-graphic-line-gradient
        class="styleContainerA"
        [reports]="reports()"
        *ngIf="reports().length > 1"
      ></app-graphic-line-gradient>

      <div class="styleContainerB" *ngIf="routines().length > 0">
        <app-graphic-circule-tag-routines class="styleCircule" [routines]="routines()">
        ></app-graphic-circule-tag-routines>

        <app-graphic-radial-bar-routines-registers class="styleRadial" [reports]="reports()" [routines]="routines()" >
        ></app-graphic-radial-bar-routines-registers>
      </div>
    </div>
  `,
})
export class CardsMiddelComponent {
  routines = input.required<IRoutine[]>();
  reports = input.required<IReport[]>();
}
