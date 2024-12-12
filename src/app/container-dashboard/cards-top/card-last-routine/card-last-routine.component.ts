import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ApexCharLineLabelsComponent } from '@app/components/apex-char-line-labels/apex-char-line-labels.component';
import { IRoutine } from '@app/models/iroutine';

@Component({
  selector: 'app-card-last-routine',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule,ApexCharLineLabelsComponent],
  templateUrl: './card-last-routine.component.html',
  styleUrl: './card-last-routine.component.scss'
})
export class CardLastRoutineComponent {

  routines = input.required<IRoutine[]>();
  
  public dataChart = [20,40,45,80,65,90];

}
