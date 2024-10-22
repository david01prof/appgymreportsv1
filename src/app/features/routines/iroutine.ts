
export interface IRoutine {
    id: string
    titleRoutine: string;
    numExercises : number,
    exercises: IExercise[],
    date: any;
    comments: string;
    status: string;
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