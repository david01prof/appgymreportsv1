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
    <div class="cardsGraphicMiddels overflow-hidden">
      <app-graphic-line-gradient class="styleContainerA"
      ></app-graphic-line-gradient>
      <app-graphic-circule-tag-routines class="styleContainerB"
      ></app-graphic-circule-tag-routines>
    </div>
  `,
  styles: `
    .cardsGraphicMiddels{
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 2rem;

      h1 { width: 100%; }
    }

    .styleContainerA{
      width: 100%;
    }

    .styleContainerB{
      width: 100%;
    }

    @media (min-width: 784px) {
      .cardsGraphicMiddels{
        flex-direction: row;
        gap:1rem
      }

      .styleContainerA{
        width: 75%;
      }

      .styleContainerB{
        width: 35%;
      }
    }
  `,
})
export class CardsMiddelComponent {}
