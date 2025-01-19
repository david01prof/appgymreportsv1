import { CommonModule, UpperCasePipe } from '@angular/common';
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
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import { CustomInputComponent } from '@app/components/custom-input/custom-input.component';
import {
  ExercisesFormControls,
  IExercise,
  IRoutine,
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
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GlobalService } from '@app/services';
import { ToastModule } from 'primeng/toast';

const PRIME_MODULES = [
  CardModule,
  ButtonModule,
  DividerModule,
  AccordionModule,
  TagModule,
  ConfirmDialogModule,
  ToastModule
];

@Component({
  selector: 'app-detail-update-report',
  standalone: true,
  imports: [
    CommonModule,
    CustomInputComponent,
    ReactiveFormsModule,
    PRIME_MODULES,
    BreadcrumbComponent
  ],
  templateUrl: './detail-update-routine.component.html',
  styleUrl: './detail-update-routine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService]
})
export class DetailUpdateReportComponent {
  public id = input<number>();

  public store = inject(GlobalRoutinesStore);
  public readonly fb = inject(NonNullableFormBuilder);
  public readonly _routineSvc = inject(RoutinesService);
  

  public routineForm!: FormGroup<RoutineForm>;

  public items!: Signal<RoutineForm>;
  public isDisabled : boolean = true;

  private readonly _router = inject(Router);
  private readonly _confirmationSvc = inject(ConfirmationService);
  private readonly globalSvc = inject(GlobalService);
  private readonly globalRoutineSvc = inject(GlobalRoutinesStore);
  private readonly messageService = inject(MessageService);

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
          titleRoutine: this.fb.control({ value: routine.titleRoutine, disabled: false }),
          numExercises: this.fb.control({ value: routine.numExercises, disabled: false }),
          exercises: this.fb.array<FormGroup<ExercisesFormControls>>(formGroupsExercises),
          date: this.fb.control(routine.date),
          favourite: this.fb.control(routine.favourite),
          tag: this.fb.group<TagFormControls>({
            title: this.fb.control(routine.tag.title) ?? '',
            tagDropdown:
              this.fb.control(routine.tag.tagDropdown) ??
              routine.tag.tagDropdown,
          }),
          comments: this.fb.control({value: routine.comments, disabled: false}),
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
      titleExercise: this.fb.control( { value: exercise.titleExercise ?? '', disabled: false }),
      numSeries: this.fb.control( { value: exercise.numSeries ?? 1, disabled: false }),
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
        replays: this.fb.control( { value: serie.replays ?? 0, disabled: false}),
        weight: this.fb.control( { value:serie.weight ?? 0, disabled: false}),
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
    let _refForm : Partial<IRoutine> = this.routineForm.value;
    const success = await this.globalRoutineSvc.updateRoutine(_refForm as IRoutine);

    if(success){
      this.globalSvc.toastSignal.set({ severity: 'success', summary: 'Operación realizada', detail: 'Rutina actualizada correctamente!', life: 2000 });
      this._router.navigate(['/routines']);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al actualizar la rutina' });
    }
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

  confirm2(event: Event) {
    this._confirmationSvc.confirm({
        target: event.target as EventTarget,
        message: 'Quieres borrar la rutina: ' + this.routineForm.value.titleRoutine + '?',
        header: 'Borrar rutina',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: async () => {
            const success = await this.store['removeRoutine'](this.id() ?? 0);
            if(success){
              this.globalSvc.toastSignal.set({ severity: 'success', summary: 'Operación realizada', detail: 'Rutina eliminada correctamente!', life: 2000 });
              this._router.navigate(['/routines']);
            }else{
              this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al eliminar la rutina' });
            }
        },
    });
}
}
