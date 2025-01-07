import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Signal,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { CustomInputComponent } from '@app/components/custom-input/custom-input.component';
import {
  ExercisesFormControls,
  IExercise,
  ISeries,
  RoutineForm,
  SeriesFormControls,
  TagFormControls,
} from '@app/models';
import { GlobalRoutinesStore } from '@app/store/globalRoutines.store';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { RoutinesService } from '../services/routines.service';

const PRIME_MODULES = [
  CardModule,
  ButtonModule,
  DividerModule,
  AccordionModule,
  TagModule,
];

@Component({
  selector: 'app-detail-update-report',
  standalone: true,
  imports: [
    CommonModule,
    CustomInputComponent,
    ReactiveFormsModule,
    PRIME_MODULES,
    BreadcrumbComponent,
  ],
  templateUrl: './detail-update-report.component.html',
  styleUrl: './detail-update-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailUpdateReportComponent {
  public id = input<number>();

  public store = inject(GlobalRoutinesStore);
  public readonly fb = inject(NonNullableFormBuilder);
  public readonly _routineSvc = inject(RoutinesService);

  public routineForm!: FormGroup<RoutineForm>;

  public items!: Signal<RoutineForm>;

  ngOnChanges() {
    if (this.id() != undefined) {
      const routine = this.store['getRoutine'](this.id()!);

      const exercises = routine?.exercises || [];
      var formGroupsExercises : FormGroup<ExercisesFormControls>[] = [];
      exercises.map((exercise) => formGroupsExercises.push(this.generateControlsExistingExercises(exercise)));

      if (routine != undefined) {
        this.routineForm = this.fb.group<RoutineForm>({
          id: this.fb.control(0),
          idRoutine: this.fb.control(routine.id),
          titleRoutine: this.fb.control(routine.titleRoutine),
          numExercises: this.fb.control(routine.numExercises),
          exercises: this.fb.array<FormGroup<ExercisesFormControls>>(formGroupsExercises),
          date: this.fb.control(routine.date),
          favourite: this.fb.control(routine.favourite),
          tag: this.fb.group<TagFormControls>({
            title: this.fb.control(routine.tag.title) ?? '',
            tagDropdown:
              this.fb.control(routine.tag.tagDropdown) ??
              routine.tag.tagDropdown,
          }),
          comments: this.fb.control(routine.comments),
        });

        this.items = signal(this.routineForm.controls);
      }
    }
  }

  public generateControlsExistingExercises(exercise: IExercise) {

    var formGroupsSeries : FormGroup<SeriesFormControls>[] = [];

    if(exercise != undefined && exercise.series != undefined && exercise.series?.length > 0){
      exercise.series.map((serie) => formGroupsSeries.push(this.generateControlsExistingSeries(serie)));
    }

    return this.fb.group<ExercisesFormControls>({
      titleExercise: this.fb.control(exercise.titleExercise ?? ''),
      numSeries: this.fb.control(exercise.numSeries ?? 1),
      series: this.fb.array<FormGroup<SeriesFormControls>>(formGroupsSeries),
    });
  }


  public generateControlsExercises() {

    this.getExercises().push(
      this.fb.group<ExercisesFormControls>({
        titleExercise: this.fb.control(''),
        numSeries: this.fb.control(1),
        series: this.fb.array<FormGroup<SeriesFormControls>>([]),
      })
    );

    this.items = signal(this.routineForm.controls);
  }

  public deleteExercise(id: number) {
    this.getExercises().removeAt(id);
  }

  public generateControlsExistingSeries(serie: ISeries) {
    return this.fb.group<SeriesFormControls>({
        replays: this.fb.control(serie.replays ?? 0),
        weight: this.fb.control(serie.weight ?? 0),
    })
  }
  public generateControlsSeries(id: number) {
    this.getSeries(id).push(
      this.fb.group<SeriesFormControls>({
        replays: this.fb.control(0),
        weight: this.fb.control(0),
      })
    );

    this.items = signal(this.routineForm.controls);
  }

  public deleteSerie(e: any) {
    this.getSeries(e.parent).removeAt(e.child);
  }

  public async onSubmit() {
    // let _refForm : Partial<IRoutine> = this.items()[0].value;
    // await this._routineSvc.newRoutine(_refForm);
    // this.router.navigate(['/routines']);
  }

  public getExercises(): FormArray {
    return this.items().exercises as FormArray;
  }

  public getSeries(id: number): FormArray {
    return this.getExercises().at(id).get('series') as FormArray;
  }

  show() {
    if (this.routineForm.value.favourite) {
      return 'block';
    } else {
      return 'hidden';
    }
  }
}
