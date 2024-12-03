export interface IReportInfo {
    created: number;
    updated: number;
    results: IReport[];
} 

export interface IReport {
    id: number;
    measurement: Measurement;
    photos: Photos[];
}

export interface Measurement extends IMeasurement {}
export interface Photos extends IPhotos {}

export interface IPhotos {
    base64: string;
}

export interface IMeasurement {
    genre: Gender;
    height: number;
    weight: number;
    age: number;
    waist: number;
    hip: number;
    totaligc: string;
}

export enum Gender {
    'MALE' = 'Male',
    'FEMALE' = 'Female',
    'GENDERLESS' = 'Genderless',
    'UNKNOWN' = 'unknown',
  }

export const emptyReport: IReport = {
    id: 0,
    measurement: {
        genre: Gender.MALE,
        height: 0,
        weight: 0,
        age: 0,
        waist: 0,
        hip: 0,
        totaligc: '',
    },
    photos: [],
}