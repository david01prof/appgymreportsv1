import { Component, input } from '@angular/core';
import { CardLastReportesComponent } from './card-last-reportes/card-last-reportes.component';
import { CardLastRoutineComponent } from './card-last-routine/card-last-routine.component';
import { CardObjetiveWeightComponent } from './card-objetive-weight/card-objetive-weight.component';
import { CommonModule } from '@angular/common';
import { IRoutine } from '@app/models/iroutine';
import { IReport } from '@app/models';

@Component({
  selector: 'app-cards-top',
  standalone: true,
  imports: [
    CardLastRoutineComponent,
    CardLastReportesComponent,
    CardObjetiveWeightComponent,
    CommonModule,
  ],
  template: `
    <div class="cardsStyles fadein animation-duration-2000">
      @if (productRoutines() != undefined && productReports() != undefined) {
      <app-card-objetive-weight class="cardA" [objetiveWeight]="objetiveWeight()" [actualWeight]="actualWeight()"></app-card-objetive-weight>
      <app-card-last-routine class="cardB" [routines]="productRoutines()"></app-card-last-routine>
      <app-card-last-reportes class="cardC" [reports]="productReports()"></app-card-last-reportes>
      }
    </div>
  `,
  styleUrls: ['./cards-top.component.scss'],
})
export class CardsTopComponent {
  productRoutines = input.required<IRoutine[]>();
  productReports = input.required<IReport[]>();
  objetiveWeight = input.required<number>();
  actualWeight = input.required<number>();
}
