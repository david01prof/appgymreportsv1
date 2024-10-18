
export interface IRoutine {
    titleExercise: string;
    numExercises : number,
    exercises: IExercise[],
    date: any;
    comments: string;
    status: string;
}

interface IExercise {
    numSeries: number;
    series: ISeries[];
}

interface ISeries {
    replays: number;
    weight: number;
}