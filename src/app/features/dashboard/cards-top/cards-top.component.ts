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
  styles: `
    .cardsStyles {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      justify-content: center;
      gap: 2rem;
      padding: 0 1rem;
    }

    h3 {
      font-size: 24px;
    }

    .cardA{
      width: 80%;
      margin: 0 auto;
    }

    .cardB{
      width: 80%;
      margin: 0 auto;
    }
    .cardC{
      width: 80%;
      margin: 0 auto;
    }

    @media (min-width: 747px) and (max-width: 783px) {
      .cardsStyles {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-left: -5px;
      }
    }

    @media (min-width: 784px) {
      .cardsStyles {
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      gap: 2rem;
      padding: 0 1rem;
      }

      .cardA{
        width: 35%;
        display: block;
      }

      .cardB{
        width: 35%;
        display: block;
      }
      .cardC{
        width: 35%;
        display: block;
      }
    }
  `,
})
export class CardsTopComponent {}
