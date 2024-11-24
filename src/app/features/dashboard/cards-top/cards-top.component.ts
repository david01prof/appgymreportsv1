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
    <div class="styleCard">
      <app-card-objetive-weight></app-card-objetive-weight>
      <app-card-last-routine></app-card-last-routine>
      <app-card-last-reportes></app-card-last-reportes>
    </div>
  `,
  styles: `
    .styleCard {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      gap: 2rem;
    }

    @media (min-width: 767px) {
      .styleCard {
        display: flex;
        flex-direction: row;
        margin: 0;
      }
    }
  `,
})
export class CardsTopComponent {}
