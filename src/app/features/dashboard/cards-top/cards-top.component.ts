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
    <div class="flex justify-content-center mb-8">
      <div class="flex justify-content-between flex-column gap-4">
        <app-card-objetive-weight></app-card-objetive-weight>
        <app-card-last-routine></app-card-last-routine>
        <app-card-last-reportes></app-card-last-reportes>
      </div>
    </div>
  `,
  styles: ``,
})
export class CardsTopComponent {}
