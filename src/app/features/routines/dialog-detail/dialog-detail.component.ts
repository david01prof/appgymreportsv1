import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DeleteRoutineDialog } from '../cards-routines/delete-routine/delete-routine-dialog';
import { IRoutine, ITag } from '../interfaces/iroutine';
import { RoutinesService } from '../services/routines.service';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

const PRIME_MODULES = [
  DialogModule,
  ButtonModule,
  InputTextModule,
  AccordionModule,
  InputNumberModule,
  DividerModule,
  InputTextareaModule,
  DropdownModule,
  TagModule
];

@Component({
  selector: 'app-dialog-detail',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule, ReactiveFormsModule,DeleteRoutineDialog],
  templateUrl: './dialog-detail.component.html',
  styleUrl: './dialog-detail.component.scss',
  providers: [ConfirmationService]
})
export class DialogDetailComponent {
  public routine = input.required<IRoutine>();
  public sendDialogHide = output();
  public showDialog = false;
  public colorsTag: any[] = []
  public selectedOption: ITag = { name: 'verde', code: 'success' };
  public date = new Date()

  public isDisabledEditAction = true;
  public forms!: FormGroup;
  public visible: boolean = true;

  public readonly _routineSvc = inject(RoutinesService)

  constructor(
    private fb: FormBuilder
  ) {  this.colorsTag =  this._routineSvc.getColorsTag();}

  ngOnChanges(): void {
    if (this.routine() != undefined) {

      let actualColor : ITag = this.colorsTag.find( (x: ITag) => x.code.includes(this.routine().severityTag.code));
      this.selectedOption = { name: actualColor.name, code: actualColor.code};

      this.forms = this.fb.group({
        id: new FormControl(this.routine().id),
        titleRoutine: new FormControl(this.routine().titleRoutine),
        numExercises: new FormControl(this.routine().numExercises),
        exercises: this.fb.array([]),
        date: new FormControl(this.routine().date),
        comments: new FormControl(this.routine().comments),
        tag: new FormControl(this.routine().tag),
        severityTag: new FormControl(this.routine().severityTag),
        favourite: new FormControl(this.routine().favourite),
      });

      this.generateControlsExercises();

      this.editRoutine();
    }
  }

  public generateControlsExercises() {
    if (
      this.forms.value.numExercises != undefined &&
      this.forms.value.numExercises > this.exercises.length
    ) {
      this.exercises.clear();

      for (let i = 0; i < this.forms.value.numExercises; i++) {
        if (this.routine()?.exercises[i] == undefined) {
          this.exercises.push(
            this.fb.group({
              titleExercise: new FormControl('nueva rutina'),
              numSeries: new FormControl(0),
              series: this.fb.array([]),
            })
          );
        } else {
          this.exercises.push(
            this.fb.group({
              titleExercise: new FormControl({
                value: this.routine()?.exercises[i].titleExercise,
                disabled: false,
              }),
              numSeries: new FormControl(
                this.routine()?.exercises[i].numSeries
              ),
              series: this.fb.array([]),
            })
          );
        }

        if (this.forms.value.numExercises > 0) {
          this.generateControlsSeries(i);
        }
      }
    } else if (
      this.forms.value.numExercises != undefined &&
      this.forms.value.numExercises < this.exercises.length
    ) {
      const number = this.exercises.length - 1;
      this.exercises.removeAt(number);
      if (this.routine()?.exercises[number] != undefined) {
        this.routine().exercises = this.routine()?.exercises.filter(
          (item, index) => index !== number
        );
      }
    }
  }

  public generateControlsSeries(index: number) {
    let series = this.forms.get(`exercises.${index}.series`) as FormArray;
    let numSeries = this.forms.get(`exercises.${index}.numSeries`) as FormControl;


    if(numSeries.value < series.length && series.length === this.routine().exercises[index].series.length){
      this.routine().exercises[index].series.pop();
    }

    series.clear();
    
    for (let i = 0; i < numSeries.value; i++) {
      if (this.routine().exercises[index] != undefined && this.routine().exercises[index].series[i] != undefined) {
        series.push(
          this.fb.group({
            replays: new FormControl({
              value: this.routine().exercises[index].series[i].replays,
              disabled: false,
            }),
            weight: new FormControl({
              value: this.routine().exercises[index].series[i].weight,
              disabled: false,
            }),
          })
        );
      } else {
        series.push(
          this.fb.group({
            replays: new FormControl(0),
            weight: new FormControl(0),
          })
        );
      }
    }
  }

  editRoutine() {
    if (this.isDisabledEditAction) {
      this.isDisabledEditAction = false;
      this.disabledEvent(this.isDisabledEditAction);
      document.documentElement.style.setProperty(
        '--displayRowInputNumber',
        'none'
      );
    } else {
      this.isDisabledEditAction = true;
      this.disabledEvent(this.isDisabledEditAction);
      document.documentElement.style.setProperty(
        '--displayRowInputNumber',
        'block'
      );
    }
  }

  getVisible(e:boolean){ this.visible = e }

  get exercises(): FormArray {
    return this.forms.get('exercises') as FormArray;
  }

  public async onSubmit() {
    if (this.forms.valid) {
      console.log( this.forms.value);
      
      await this._routineSvc.updateRoutine(this.forms.value.id,  this.forms.value);
      this.visible = false;
    } else {
      console.log('Formulario inválido');
    }
  }

  private disabledEvent(isDisabledEditAction: boolean) {
    if (isDisabledEditAction) {
      this.forms.controls['titleRoutine'].enable();
      document.documentElement.style.setProperty(
        '--displayTextAlignTitle',
        'left'
      );

      let exercise: any = this.forms.controls['exercises'];
      for (let i in this.forms.controls['exercises'].value) {
        exercise.controls[i].controls['titleExercise'].enable();
        exercise.controls[i].controls['numSeries'].enable();

        for (let j in exercise.controls[i].controls['series'].value) {
          exercise.controls[i].controls['series'].controls[j].controls[
            'weight'
          ].enable();

          exercise.controls[i].controls['series'].controls[j].controls[
            'replays'
          ].enable();
        }
      }
      this.forms.controls['exercises'] = exercise;
    } else {
      this.forms.controls['titleRoutine'].disable();
      document.documentElement.style.setProperty(
        '--displayTextAlignTitle',
        'center'
      );
      let exercise: any = this.forms.controls['exercises'];
      for (let i in this.forms.controls['exercises'].value) {
        exercise.controls[i].controls['titleExercise'].disable();
        exercise.controls[i].controls['numSeries'].disable();

        for (let j in exercise.controls[i].controls['series'].value) {
          exercise.controls[i].controls['series'].controls[j].controls[
            'weight'
          ].disable();
          exercise.controls[i].controls['series'].controls[j].controls[
            'replays'
          ].disable();
        }
      }

      this.forms.controls['exercises'] = exercise;
    }
  }
}
