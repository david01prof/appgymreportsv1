export interface IRoutine {
    titleExercise: string;
    numSeries: number;
    series: ISeries[];
    date: Date;
    comments: string;
    status: boolean;
}


interface ISeries {
    replays: number;
    weight: number;
}