import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GraphicLineGradientComponent } from './graphic-line-gradient/graphic-line-gradient.component';
import { GraphicCirculeTagRoutinesComponent } from './graphic-circule-tag-routines/graphic-circule-tag-routines.component';
import { GraphicRadialBarRoutinesRegistersComponent } from './graphic-radial-bar-routines-registers/graphic-radial-bar-routines-registers.component';

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
    <div class="cardsGraphicMiddels overflow-hidden">
      <app-graphic-line-gradient
        class="styleContainerA"
      ></app-graphic-line-gradient>

      <div class="styleContainerB">
        <app-graphic-circule-tag-routines class="styleCircule">
        ></app-graphic-circule-tag-routines>

        <app-graphic-radial-bar-routines-registers class="styleRadial"
        ></app-graphic-radial-bar-routines-registers>
      </div>
    </div>
  `,
})
export class CardsMiddelComponent {}
