import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { BreadcrumbComponent } from '@app/components/breadcrumb/breadcrumb.component';
import {
  emptyRoutine,
  ExercisesFormControls,
  IRoutine,
  RoutineForm,
  SeriesFormControls,
  TagFormControls
} from '@app/models';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { RoutinesService } from '../services/routines.service';
import { FormRoutineChildComponent } from './form-routine-child/form-routine-child.component';
import { Router } from '@angular/router';
import { GlobalRoutinesStore } from '@app/store/globalRoutines.store';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { GlobalService } from '@app/services';

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
  InputGroupAddonModule,
  ToastModule
];

export type CustomFormGroup = FormGroup<RoutineForm>;

@Component({
  selector: 'app-add-routine',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PRIME_MODULES,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    FormRoutineChildComponent,
  ],
  templateUrl: './add-routine.component.html',
  styleUrl: './add-routine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class AddRoutineComponent {
  
  public readonly fb = inject(NonNullableFormBuilder);
  public readonly _routineSvc = inject(RoutinesService);
  public readonly messageService = inject(MessageService);

  public getToast = output<any>();
  
  public routineForm: FormGroup<{ items: FormArray<CustomFormGroup> }> =
    this.fb.group({
      items: this.fb.array<CustomFormGroup>([]),
    })
  ;
  public items = signal(this.routineForm.controls.items.controls);

  private routineEmptyForm = computed(() => emptyRoutine);
  private readonly router = inject(Router);
  private readonly globalRoutineSvc = inject(GlobalRoutinesStore);
  private readonly globalSvc = inject(GlobalService);

  constructor() {this.addRoutine()}

  addRoutine() {
    const id = this.items().length + 1;
    const itemForm = this.fb.group<RoutineForm>({
      id: this.fb.control(0),
      idRoutine: this.fb.control(id),
      titleRoutine: this.fb.control(this.routineEmptyForm().titleRoutine, [Validators.required]),
      numExercises: this.fb.control(this.routineEmptyForm().numExercises , [Validators.min(0)]),
      exercises: this.fb.array<FormGroup<ExercisesFormControls>>([]),
      date: this.fb.control(this.routineEmptyForm().date),
      favourite: this.fb.control(this.routineEmptyForm().favourite),
      tag: this.fb.group<TagFormControls>({
        title: this.fb.control(this.routineEmptyForm().tag.title, [Validators.required]) ?? '',
        tagDropdown: this.fb.control(emptyRoutine.tag.tagDropdown) ?? emptyRoutine.tag.tagDropdown,
      }),
      comments: this.fb.control(this.routineEmptyForm().comments),
    });

    this.routineForm.controls.items.push(itemForm);
    this.items.set([...this.routineForm.controls.items.controls]);
    this.generateControlsExercises();
    this.generateControlsSeries(0);
  }

  public generateControlsExercises() {
    this.getExercises().push(
      this.fb.group<ExercisesFormControls>({
        titleExercise: this.fb.control('',[Validators.required]),
        numSeries: this.fb.control(1, [Validators.min(0)]),
        series: this.fb.array<FormGroup<SeriesFormControls>>([]),
      })
    );

    this.items.set([...this.routineForm.controls.items.controls]);
  }

  public deleteExercise(id: number) {
    this.getExercises().removeAt(id);
  }

  public generateControlsSeries(id:number) {
    this.getSeries(id).push(
      this.fb.group<SeriesFormControls>({
        replays: this.fb.control(0, [Validators.min(0)]),
        weight: this.fb.control(0, [Validators.min(0)])
      })
    )
  
    this.items.set([...this.routineForm.controls.items.controls]);
  }

  public deleteSerie(e:any) {
    this.getSeries(e.parent).removeAt(e.child);
  }

  public async onSubmit() {
    let _refForm : Partial<IRoutine> = this.items()[0].value;
    const fullRoutine: Omit<IRoutine, 'id' | 'created'> = _refForm as Omit<IRoutine, 'id' | 'created'>;
    const success = await this.globalRoutineSvc.addRoutine(fullRoutine);

    if(success){
      this.globalSvc.toastSignal.set({ severity: 'success', summary: 'Operación realizada', detail: 'Rutina creada correctamente!', life: 2000 });
      this.router.navigate(['/routines']);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Operación realizada', detail: 'Fallo al crear la rutina' });
    }
  }

  public getExercises(): FormArray {
    return this.items()[0].controls.exercises as FormArray;
  }

  public getSeries(id: number): FormArray {
    return this.getExercises().at(id).get('series') as FormArray;
  }
}
