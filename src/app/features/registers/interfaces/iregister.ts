import { IMeasurement } from "./imeasurement";

export interface IRegister {
    id?: string;
    calculator: IMeasurement;
    photos: IPhotos[];
    created?: number;
    actions?: any;
}

export interface IPhotos {
    base64: string;
}

export interface ITagsGraph{
    label: string;
    contador: number;
}