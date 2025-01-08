import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ApexCharLineLabelsComponent } from '@app/components/apex-char-line-labels/apex-char-line-labels.component';
import { IRoutine } from '@app/models/iroutine';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-last-routine',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule,ApexCharLineLabelsComponent],
  templateUrl: './card-last-routine.component.html',
  styleUrl: './card-last-routine.component.scss'
})
export class CardLastRoutineComponent {

  routines = input.required<IRoutine[]>();
  
  public dataChart = signal<number[]>([0]);

  ngOnChanges(){
    if(this.routines().length > 0 ){
      let ref :number[]= [0];
      for(let routine = 0; routine < this.routines().length; routine++){
        ref.push(1)
      } 
      this.dataChart.set(ref);
    }
  }

}
