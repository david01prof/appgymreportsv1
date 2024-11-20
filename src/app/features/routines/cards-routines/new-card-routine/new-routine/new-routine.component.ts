import { Component, inject, input, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IRoutine, ITag } from '../../../interfaces/iroutine';
import { RoutinesService } from '../../../services/routines.service';
import { Timestamp } from 'firebase/firestore';

const PRIME_MODULES = [
  CardModule,
  ButtonModule,
  CalendarModule,
  InputNumberModule,
  InputTextModule,
  InputTextareaModule,
  DividerModule,
  ScrollPanelModule,
  TagModule,
  DropdownModule,
  CheckboxModule,
  InputGroupModule,
  InputGroupAddonModule
];

@Component({
  selector: 'app-new-routine',
  standalone: true,
  imports: [ReactiveFormsModule, PRIME_MODULES, CommonModule, FormsModule],
  templateUrl: './new-routine.component.html',
  styleUrl: './new-routine.component.scss',
})
export class NewRoutineComponent {

  public routine = input<IRoutine>();
  public titleRoutine = input.required<string>();
  public forms!: FormGroup;
  public sendSubmitValue = output<boolean>();
  public sendIsFavourite = output<boolean>();
  public colorsTag: any[] = []
  public selectedOption: ITag = { name: 'verde', code: 'success' };
  public checked = new FormControl(false);

  private readonly _routineSvc = inject(RoutinesService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.colorsTag =  this._routineSvc.getColorsTag();
    
    if (this.routine() == undefined) {
      this.forms = new FormGroup({
        titleRoutine: new FormControl('Nueva rutina'),
        numExercises: new FormControl(0),
        exercises: this.fb.array([]),
        date: new FormControl(Timestamp.now()),
        comments: new FormControl(''),
        tag: new FormControl('nuevo'),
        severityTag: new FormControl(this.selectedOption.code),
        favourite: new FormControl(false),
      });
    }
  }

  ngOnChanges(): void {
    if(this.forms != undefined){
      this.forms.controls['titleRoutine'].setValue(this.titleRoutine());
    }
  }

  get exercises(): FormArray {
    return this.forms.get('exercises') as FormArray;
  }

  public async onSubmit() {
    let _refForm = this.forms.value;

    if (this.forms.valid) {
      await this._routineSvc.newRoutine(_refForm);
      this.sendSubmitValue.emit(true);
    } else {
      console.log('Formulario inválido');
    }
  }

  public getSeries(id: number): FormArray {
    return this.exercises.at(id).get('series') as FormArray;
  }

  public generateControlsExercises() {
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
  }

  public generateControlsSeries(index: number) {
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
  }

  show(){
    if(this.forms.value.favourite){
      this.sendIsFavourite.emit(true);
      return 'block'
    }else{
      this.sendIsFavourite.emit(false);
      return 'hidden'
    }
  }
}
