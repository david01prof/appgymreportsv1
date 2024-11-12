import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { IRoutine } from '../iroutine';
import { NewCardRoutineComponent } from './new-card-routine/new-card-routine.component';

const PRIME_MODULES = [CardModule, TagModule];

@Component({
  selector: 'app-cards-routines',
  standalone: true,
  imports: [CommonModule,PRIME_MODULES,NewCardRoutineComponent],
  template: `
    <div class="card flex justify-content-between flex-wrap">

      <app-new-card-routine ></app-new-card-routine>

      @for (item of data(); track $index) {

      <p-card class="mb-3 custom-card" (click)="checkActiveCard(item)">

        @if (item.favourite) {
        <i class="pi pi-bookmark-fill favouriteItem">
          <i class="pi pi-star-fill"></i></i>
        }

        <div class="flex justify-content-center">
          <img src=".../../assets/images/serio.png" alt="" width="90" />
        </div>

        <pre class="text-center text-base text-color-secondary">{{ item.titleRoutine }}</pre>

        <div class="card flex justify-content-center">
          <p-tag [value]="item.tag" [severity]="item.severityTag.code"/>
        </div>
      </p-card>
      }
    </div>
  `,
  styles: `
    .icon-marker{
      position: absolute;
      top: -0.1rem;
      left: 0.5rem;
      font-size: 2.3rem;
      color: #dadee3;
    }

    .new-card{
        transition: transform 0.1s ease-in-out; /* Suaviza el efecto de escalado */
        cursor: pointer; /* Cambia el cursor a pointer */
    }

    .new-card:active {
        transform: scale(0.98);
    }

    .custom-card {
        position: relative;
        width: 168px;
        overflow: hidden;
        transition: transform 0.1s ease-in-out; /* Suaviza el efecto de escalado */
        cursor: pointer; /* Cambia el cursor a pointer */
    }
    .custom-card:active {
        transform: scale(0.98);
    }
    pre {
        white-space: pre-wrap;      /* Permite que el texto se ajuste y rompa en varias líneas */
        word-wrap: break-word;      /* Fuerza la ruptura de palabras largas que exceden el ancho del contenedor */
        overflow-wrap: break-word;  /* Asegura compatibilidad en más navegadores */
    }

    .favouriteItem {
        position: absolute;
        top: 0rem;
        font-size: 2.2rem;
        right: 0.5rem;
        color: orange;
        & i {
            position: absolute;
            top: 0.3rem;
            font-size: 1rem;
            right: 0.6rem;
            color: white;
        }
    }
  `,
})
export class CardsRoutinesComponent {
  public data = input.required<IRoutine[]>();

  public sidebarVisible = output<boolean>();
  public activeItem = output<IRoutine>(); 

  checkActiveCard(item: IRoutine) {
    this.sidebarVisible.emit(true);
    this.activeItem.emit(item);
  }
}
