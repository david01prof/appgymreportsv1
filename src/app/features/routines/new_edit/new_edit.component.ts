import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IRoutine } from '../iroutine';
import { RoutinesService } from '../routines.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';

const PRIME_MODULES = [
  CardModule,
  ButtonModule,
  CalendarModule,
  InputNumberModule,
  InputTextModule,
  InputTextareaModule,
  DividerModule,
  ScrollPanelModule
];
@Component({
  selector: 'app-new-edit',
  standalone: true,
  imports: [ReactiveFormsModule, PRIME_MODULES, CommonModule],
  templateUrl: './new_edit.component.html',
  styleUrl: './new_edit.component.scss',
})
export class NewEditComponent implements OnInit {
  
  public routine = input<IRoutine>();
  public forms!: FormGroup;

  public sendSubmitValue = output<boolean>();

  private readonly _routineSvc = inject(RoutinesService);

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.routine() == undefined) {
      this.forms = new FormGroup({
        titleRoutine: new FormControl('Crear nueva rutina'),
        numExercises: new FormControl(0),
        exercises: this.fb.array([]),
        date: new FormControl(new Date()),
        comments: new FormControl(''),
        status: new FormControl('EnProceso'),
      });
    } else {
      this.forms = new FormGroup({
        titleRoutine: new FormControl(this.routine()?.titleRoutine),
        numExercises: new FormControl(this.routine()?.numExercises),
        exercises: this.fb.array([]),
        date: new FormControl(new Date()),
        comments: new FormControl(this.routine()?.comments),
      });

      this.generateControlsExercises();
    }
  }

  get exercises(): FormArray {
    return this.forms.get('exercises') as FormArray;
  }

  public async onSubmit() {
    let _refForm = this.forms.value;

    if (this.forms.valid) {
      if (_refForm.date.getDate() < new Date().getDate()) {
        _refForm.status = 'Finalizada';
      } else if (
        _refForm.date.getDate() == new Date().getDate() &&
        _refForm.date.getMonth() < new Date().getMonth()
      ) {
        _refForm.status = 'Finalizada';
      } else if (
        _refForm.date.getDate() == new Date().getDate() &&
        _refForm.date.getMonth() > new Date().getMonth()
      ) {
        _refForm.status = 'Pendiente';
      } else if (_refForm.date.getDate() > new Date().getDate()) {
        _refForm.status = 'Pendiente';
      }

      await this._routineSvc.newRoutine(_refForm);

      this.sendSubmitValue.emit(true);
      this.router.navigate(['routines']);
    } else {
      console.log('Formulario inválido');
    }
  }

  public getSeries(id: number): FormArray {
    return this.exercises.at(id).get('series') as FormArray;
  }

  public generateControlsExercises() {
    if (this.routine() === undefined) {
      this.exercises.clear();

      for (let i = 0; i < this.forms.value.numExercises; i++) {
        this.exercises.push(
          this.fb.group({
            titleExercise: new FormControl(''),
            numSeries: new FormControl(0),
            series: this.fb.array([]),
          })
        );
      }
    } else {
      for (let i = 0; i < this.routine()!.numExercises; i++) {
        this.exercises.push(
          this.fb.group({
            titleExercise: new FormControl(
              this.routine()?.exercises[i].titleExercise
            ),
            numSeries: new FormControl(this.routine()?.exercises[i].numSeries),
            series: this.fb.array([]),
          })
        );

        this.generateControlsSeries(i);
      }
    }
  }

  public generateControlsSeries(index: number) {
    if (this.routine() === undefined) {
      let series = this.forms.get(`exercises.${index}.series`) as FormArray;
      series.clear();

      let numSeries = this.forms.get(
        `exercises.${index}.numSeries`
      ) as FormControl;

      for (let i = 0; i < numSeries.value; i++) {
        series.push(
          this.fb.group({
            replays: new FormControl(0), // Control para replays
            weight: new FormControl(0), // Control para weight
          })
        );
      }
    } else {
      let series = this.routine()?.exercises[index].series;
      let formSeries = this.forms.get(`exercises.${index}.series`) as FormArray;
      let numSeries = this.routine()?.exercises[index].numSeries;

      for (let i = 0; i < numSeries!; i++) {
        formSeries!.push(
          this.fb.group({
            replays: new FormControl(series![i].replays), //Control para replays
            weight: new FormControl(series![i].weight), // Control para weight
          })
        );
      }
    }
  }
}
