import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GraphicLineGradientComponent } from './graphic-line-gradient/graphic-line-gradient.component';
import { GraphicCirculeTagRoutinesComponent } from './graphic-circule-tag-routines/graphic-circule-tag-routines.component';
import { GraphicRadialBarRoutinesRegistersComponent } from './graphic-radial-bar-routines-registers/graphic-radial-bar-routines-registers.component';
import { IRegister } from '../../registers/interfaces/iregister';
import { IRoutine } from '../../routines/interfaces/iroutine';

@Component({
  selector: 'app-cards-middel',
  standalone: true,
  imports: [
    CardModule,
    GraphicLineGradientComponent,
    GraphicCirculeTagRoutinesComponent,
    GraphicRadialBarRoutinesRegistersComponent,
  ],
  styleUrls: ['./cards-middel.component.scss'],
  template: `
    <div class="cardsGraphicMiddels overflow-hidden fadein animation-duration-1000">
      <app-graphic-line-gradient
        class="styleContainerA"
      ></app-graphic-line-gradient>

      <div class="styleContainerB">
        <app-graphic-circule-tag-routines class="styleCircule" [routines]="routines()">
        ></app-graphic-circule-tag-routines>

        <app-graphic-radial-bar-routines-registers class="styleRadial" [reports]="reports()" [routines]="routines()">
        ></app-graphic-radial-bar-routines-registers>
      </div>
    </div>
  `,
})
export class CardsMiddelComponent {
  routines = input.required<IRoutine[]>();
  reports = input.required<IRegister[]>();
}
