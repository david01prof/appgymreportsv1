import { Component } from '@angular/core';
import { CardLastReportesComponent } from './card-last-reportes/card-last-reportes.component';
import { CardLastRoutineComponent } from './card-last-routine/card-last-routine.component';
import { CardObjetiveWeightComponent } from './card-objetive-weight/card-objetive-weight.component';

@Component({
  selector: 'app-cards-top',
  standalone: true,
  imports: [
    CardLastRoutineComponent,
    CardLastReportesComponent,
    CardObjetiveWeightComponent,
  ],
  template: `
    <div class="cardsStyles">
      <app-card-objetive-weight class="cardA"></app-card-objetive-weight>
      <app-card-last-routine class="cardB"></app-card-last-routine>
      <app-card-last-reportes class="cardC"></app-card-last-reportes>
    </div>
  `,
  styleUrls: ['./cards-top.component.scss'],
})
export class CardsTopComponent {}
