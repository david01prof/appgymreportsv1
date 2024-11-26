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
  template: `
    <div class="cardsGraphicMiddels overflow-hidden">
      <app-graphic-line-gradient
        class="styleContainerA"
      ></app-graphic-line-gradient>

      <div class="flex flex-column styleContainerB">
        <app-graphic-circule-tag-routines
        ></app-graphic-circule-tag-routines>

        <app-graphic-radial-bar-routines-registers
        ></app-graphic-radial-bar-routines-registers>
      </div>
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
      gap: 0.5rem;
    }

    @media (min-width: 784px) {
      .cardsGraphicMiddels{
        flex-direction: row;
        gap:1rem;
        margin: 0 auto;
      }

      .styleContainerA{
        width: 70%;
      }

      .styleContainerB{
        width: 30%;
      }
    }
  `,
})
export class CardsMiddelComponent {}
