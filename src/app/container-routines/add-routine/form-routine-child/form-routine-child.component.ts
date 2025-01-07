import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '@app/components/custom-input/custom-input.component';
import { RoutinesService } from '@app/container-routines/services/routines.service';
import { RoutineForm } from '@app/models';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-form-routine-child',
  standalone: true,
  imports: [ReactiveFormsModule,CustomInputComponent,CardModule,TagModule,DividerModule,ButtonModule,CommonModule,AccordionModule],
  templateUrl: './form-routine-child.component.html',
  styleUrl: './form-routine-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormRoutineChildComponent {

  formGroup = input.required<FormGroup<RoutineForm>>();
  addRoutine = output();
  addSerie = output<number>();
  deleteExercise = output<number>();
  deleteSerie = output<any>();

  public readonly _routineSvc = inject(RoutinesService);

  ngOnChanges(): void {
    console.log(this.formGroup());
    
  }

  show(){
    if(this.formGroup().value.favourite){
      return 'block'
    }else{
      return 'hidden'
    }
  }
}
