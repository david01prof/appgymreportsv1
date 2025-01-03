import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IRoutine } from '@app/models/iroutine';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';


const PRIME_MODULES = [CardModule, TagModule];

@Component({
  selector: 'app-cards-routines',
  standalone: true,
  imports: [CommonModule, PRIME_MODULES,RouterLink],
  templateUrl: './cards-routines-component.component.html',
  styleUrl: './cards-routines-component.component.scss'
})
export class CardsRoutinesComponent {
  
  public data = input.required<IRoutine>();

  public sidebarVisible = output<boolean>();
  public activeItem = output<IRoutine>();

  checkActiveCard(item: IRoutine) {
    this.sidebarVisible.emit(true);
    this.activeItem.emit(item);
  }
}
