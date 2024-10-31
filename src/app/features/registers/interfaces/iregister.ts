import { IMeasurement } from "./imeasurement";

export interface IRegister {
    id: string;
    calculator: IMeasurement;
    photos: IPhotos[];
}

export interface IPhotos {
    base64: string;
}