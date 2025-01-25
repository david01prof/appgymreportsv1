import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface IRoutine {
  id: number;
  idRoutine: number;
  created: number;
  titleRoutine: string;
  numExercises: number;
  exercises?: IExercise[];
  date: Date;
  favourite: boolean;
  tag: ITag;
  comments: string;
}

export interface IExercise {
  titleExercise?: string;
  numSeries?: number;
  series?: ISeries[];
}

export interface ISeries {
  replays?: number;
  weight?: number;
}

export interface ITag {
  title?: string;
  tagDropdown?: Status;
}

export  interface Status {
  label: string;
  severity: 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';
}


export interface RoutineForm {
  id: FormControl<number>;
  idRoutine: FormControl<number>;
  titleRoutine: FormControl<string>;
  numExercises: FormControl<number>;
  exercises: FormArray<FormGroup<ExercisesFormControls>>;
  date: FormControl<Date>;
  favourite: FormControl<boolean>;
  tag: FormGroup<TagFormControls>;
  comments: FormControl<string>;
}
export interface ExercisesFormControls {
  titleExercise: FormControl<string>;
  numSeries: FormControl<number>;
  series: FormArray<FormGroup<SeriesFormControls>>;
}

export interface SeriesFormControls {
  replays: FormControl<number>;
  weight: FormControl<number>;
}

export interface TagFormControls {
  title: FormControl<string | undefined>;
  tagDropdown: FormControl<Status | undefined>;
}

export const emptyRoutine : IRoutine = {
  id: 0,
  idRoutine: 0,
  titleRoutine: 'Nueva rutina',
  created: new Date().getTime(),
  numExercises: 1,
  exercises: [],
  date: new Date(),
  favourite: false,
  tag: { title: 'new', tagDropdown: { label: 'Verde', severity: 'success' } },
  comments: '',
}