import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { NewCardRoutineComponent } from './new-card-routine/new-card-routine.component';
import { IRoutine } from '../interfaces/iroutine';
import { RoutinesService } from '../services/routines.service';


const PRIME_MODULES = [CardModule, TagModule];

@Component({
  selector: 'app-cards-routines',
  standalone: true,
  imports: [CommonModule, PRIME_MODULES, NewCardRoutineComponent],
  templateUrl: './cards-routines-component.component.html',
  styleUrl: './cards-routines-component.component.scss'
})
export class CardsRoutinesComponent {
  public data = input.required<IRoutine[]>();

  public sidebarVisible = output<boolean>();
  public activeItem = output<IRoutine>();

  private readonly _routineSvc = inject(RoutinesService);

  checkActiveCard(item: IRoutine) {
    this.sidebarVisible.emit(true);
    item.date = this._routineSvc.convertTimeStamptoDate(item.date.seconds);
    this.activeItem.emit(item);
  }
}
