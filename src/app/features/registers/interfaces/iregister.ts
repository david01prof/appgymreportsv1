import { IMeasurement } from "./imeasurement";

export interface IRegister {
    id?: string;
    calculator: IMeasurement;
    photos: IPhotos[];
    created?: number;
}

export interface IPhotos {
    base64: string;
}