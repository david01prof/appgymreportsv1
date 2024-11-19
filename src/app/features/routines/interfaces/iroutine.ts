export interface IRoutine {
  id: string;
  titleRoutine: string;
  numExercises: number;
  exercises: IExercise[];
  updated: any;
  favourite: boolean;
  severityTag: ITag;
  tag:string;
  comments: string;
}

export interface IExercise {
  titleExercise: string;
  numSeries: number;
  series: ISeries[];
}

export interface ISeries {
  replays: number;
  weight: number;
}

export interface ITag {
  name: string;
  code: any;
}
