export interface IReportInfo {
  created: number;
  updated: number;
  results: IReport[];
}

export interface IReport {
  id?: number;
  idReport: number;
  created: number;
  measurement: Measurement;
  photos: Photos[];
}

export interface Measurement extends IMeasurement {}
export interface Photos extends IPhotos {}

export interface IPhotos {
  base64: Blob | string;
}

export interface IMeasurement {
  genre: IGenderSelect;
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

export interface IGenderSelect {
    name: string;
    code: Gender;
}

export const emptyReport: IReport = {
  id: 0,
  idReport: 0,
  created: new Date().getTime(),
  measurement: {
    genre: { name: 'Masculino', code: Gender.MALE },
    height: 0,
    weight: 0,
    age: 0,
    waist: 0,
    hip: 0,
    totaligc: '',
  },
  photos: [],
};
