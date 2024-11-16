import { Component, inject, input, output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IRoutine } from '../iroutine';
import { NewEditComponent } from '../new_edit/new_edit.component';
import { RoutinesService } from '../routines.service';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';

const PRIME_MODULES = [
  DialogModule,
  ButtonModule,
  InputTextModule,
  AccordionModule,
  ConfirmDialogModule,
  InputNumberModule,
  DividerModule
];

@Component({
  selector: 'app-dialog-detail',
  standalone: true,
  imports: [PRIME_MODULES, NewEditComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-detail.component.html',
  styleUrl: './dialog-detail.component.scss',
  providers: [ConfirmationService],
})
export class DialogDetailComponent {

  public routine = input.required<IRoutine>();
  public sendDialogHide = output();
  public titleRoutine = new FormControl({ value: '', disabled: false });

  public isDisabledEditAction = true;
  public forms!: FormGroup;
  public visible: boolean = true;

  public readonly _routineSvc = inject(RoutinesService);

  constructor( private confirmationService: ConfirmationService, private fb: FormBuilder ) {}

  ngOnChanges(): void {
    if (this.routine() != undefined) { 
      this.titleRoutine.setValue(this.routine().titleRoutine);

      this.forms = this.fb.group({
        titleRoutine: new FormControl(this.titleRoutine.value),
        numExercises: new FormControl(this.routine().numExercises),
        exercises: this.fb.array([]),
        date: new FormControl(this.routine().date),
        comments: new FormControl(this.routine().comments),
        tag: new FormControl(this.routine().tag),
        severityTag: new FormControl(this.routine().severityTag),
        favourite: new FormControl(this.routine().favourite),
      });

      this.generateControlsExercises()

      this.editRoutine();
    }
  }

  public generateControlsExercises() {   
    for (let i = 0; i < this.forms.value.numExercises; i++) {
      this.exercises.push(
        this.fb.group({
          titleExercise: new FormControl({value: this.routine()?.exercises[i].titleExercise, disabled: false}),
          numSeries: new FormControl(this.routine()?.exercises[i].numSeries),
          series: this.fb.array([]),
        })
      ); 
      
      this.generateControlsSeries(i);
    }
  }

  public generateControlsSeries(index: number) {
    let series = this.forms.get(`exercises.${index}.series`) as FormArray;
    series.clear;

    let numSeries = this.forms.get(
      `exercises.${index}.numSeries`
    ) as FormControl;
    
    for (let i = 0; i < numSeries.value; i++) {
      series.push(
        this.fb.group({
          replays: new FormControl( { value: this.routine().exercises[index].series[i].replays, disabled: false }),
          weight: new FormControl( { value: this.routine().exercises[index].series[i].weight, disabled: false }),
        })
      );
    }    
  }

  deleteRoutine(id: any) {
    if (id != undefined) {
      this._routineSvc.deleteRoutine(id);
    }
    this.visible = false;
  }

  editRoutine() {
    if (this.isDisabledEditAction) {
      this.isDisabledEditAction = false;
      this.titleRoutine.disable();
      this.disabledEvent(this.isDisabledEditAction)
      document.documentElement.style.setProperty('--displayRowInputNumber', 'none');
    } else {
      this.isDisabledEditAction = true;
      this.titleRoutine.enable();
      this.disabledEvent(this.isDisabledEditAction)
      document.documentElement.style.setProperty('--displayRowInputNumber', 'block');
    }
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Quieres eliminar esta rutina?',
      header: 'Confirmacion',
      accept: () => {},
      reject: () => {},
    });
  }

  get exercises(): FormArray {
    return this.forms.get('exercises') as FormArray;
  }

  public async onSubmit() {
    let _refForm = this.forms.value;

    if (this.forms.valid) {
      // await this._routineSvc.newRoutine(_refForm);
      // this.sendSubmitValue.emit(true);
    } else {
      console.log('Formulario inválido');
    }
  }

  private disabledEvent(isDisabledEditAction: boolean) {
    if(isDisabledEditAction){

      let exercise : any= this.forms.controls['exercises'];
      for (let i in this.forms.controls['exercises'].value) {

        exercise.controls[i].controls['titleExercise'].enable();
        exercise.controls[i].controls['numSeries'].enable();

        for (let j in exercise.controls[i].controls['series'].value) {
          
          exercise.controls[i].controls['series'].controls[j].controls['weight'].enable();

          exercise.controls[i].controls['series'].controls[j].controls['replays'].enable();
        }
      }
      this.forms.controls['exercises'] = exercise;
      
    }else{
      
      let exercise : any= this.forms.controls['exercises'];
      for (let i in this.forms.controls['exercises'].value) {

        exercise.controls[i].controls['titleExercise'].disable();
        exercise.controls[i].controls['numSeries'].disable();

        for (let j in exercise.controls[i].controls['series'].value) {
          exercise.controls[i].controls['series'].controls[j].controls['weight'].disable();
          exercise.controls[i].controls['series'].controls[j].controls['replays'].disable();
        }
      }

      this.forms.controls['exercises'] = exercise;
      
    }

  }
}
