import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GraphicLineGradientComponent } from './graphic-line-gradient/graphic-line-gradient.component';
import { GraphicCirculeTagRoutinesComponent } from './graphic-line-gradient/graphic-circule-tag-routines/graphic-circule-tag-routines.component';

@Component({
  selector: 'app-cards-middel',
  standalone: true,
  imports: [CardModule,GraphicLineGradientComponent,GraphicCirculeTagRoutinesComponent],
  template: `
    <div class="flex justify-content-around flex-wrap gap-2 styleWidth">
      <!-- <div class="flex justify-content-start styleContainerA"> -->
        <app-graphic-line-gradient class="flex justify-content-start styleContainerA"></app-graphic-line-gradient>
      <!-- </div> -->

      <!-- <div class="flex justify-content-start styleContainerB"> -->
        <app-graphic-circule-tag-routines  class="flex justify-content-end styleContainerB"></app-graphic-circule-tag-routines>
      <!-- </div> -->
    </div>
  `,
  styles: `
    .styleWidth{
      width: 100%;
    }

    .styleContainerA{
      width: 59%;
    }

    .styleContainerB{
      width: 40%;
    }
  `,
})
export class CardsMiddelComponent {}
