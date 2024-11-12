import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
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
import { IRoutine, ITag } from '../iroutine';
import { RoutinesService } from '../routines.service';

const PRIME_MODULES = [
  CardModule,
  ButtonModule,
  CalendarModule,
  InputTextModule,
  InputTextareaModule,
  DividerModule,
  ScrollPanelModule,
  TagModule,
  DropdownModule,
  CheckboxModule,
];

@Component({
  selector: 'app-detail-edit-routine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,PRIME_MODULES,InputNumberModule],
  templateUrl:'./detail-edit-routine.component.html',
  styleUrl: './detail-edit-routine.component.scss',
})
export class DetailEditRoutineComponent implements OnInit, OnChanges {

  public routine = input<IRoutine>();
  public forms = input.required<FormGroup>();
  public colorsTag: any[] = [];
  public selectedOption: ITag = { name: 'verde', code: 'success' };
  public numExercise = new FormControl();

  private readonly _routineSvc = inject(RoutinesService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.colorsTag = this._routineSvc.getColorsTag();
  }

  ngOnChanges(): void {
    if (this.forms() != undefined) {
      console.log(this.forms().value);
      console.log(this.forms());
      this.numExercise = new FormControl(this.forms().value.numExercises);
      //  this.generateControlsExercises();
    }
  }

  show() {
    if (this.forms().value.favourite) {
      return 'block';
    } else {
      return 'hidden';
    }
  }
  get exercises(): FormArray {
    return this.forms().get('exercises') as FormArray;
  }

  public getSeries(id: number): FormArray {
    return this.exercises.at(id).get('series') as FormArray;
  }


  public generateControlsExercises() {
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

  public generateControlsSeries(index: number) {
    let series = this.routine()?.exercises[index].series;
    let formSeries = this.forms().get(`exercises.${index}.series`) as FormArray;
    let numSeries = this.routine()?.exercises[index].numSeries;

    if(numSeries != undefined && numSeries > 0){
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

  public async onSubmit() {
    let _refForm = this.forms().value;

    if (this.forms().valid) {
      await this._routineSvc.newRoutine(_refForm);
    } else {
      console.log('Formulario inválido');
    }
  }
}
