import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GraphicLineGradientComponent } from './graphic-line-gradient/graphic-line-gradient.component';
import { GraphicCirculeTagRoutinesComponent } from './graphic-line-gradient/graphic-circule-tag-routines/graphic-circule-tag-routines.component';

@Component({
  selector: 'app-cards-middel',
  standalone: true,
  imports: [
    CardModule,
    GraphicLineGradientComponent,
    GraphicCirculeTagRoutinesComponent,
  ],
  template: `
    <div class="flex justify-content-around gap-2 styleCard">
      <app-graphic-line-gradient
        class="flex justify-content-start styleContainerA"
      ></app-graphic-line-gradient>

      <app-graphic-circule-tag-routines
        class="flex justify-content-end styleContainerB"
      ></app-graphic-circule-tag-routines>
    </div>
  `,
  styles: `
    .styleCard{
      width: 100%;
      display: flex-column
    }

    .styleContainerA{
      width: 59%;
    }

    .styleContainerB{
      width: 40%;
    }

    @media (min-width: 320px) {
      .styleCard{
        display: flex-wrap;
      }
    }
  `,
})
export class CardsMiddelComponent {}
