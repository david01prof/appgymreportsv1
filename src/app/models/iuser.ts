import { Gender } from "./ireport";

export interface IUser {
    email: string;
    username: string;
    password: string;
    age: number;
    gender: Gender;
    objetiveWeight: number;
    photo: string;
    createdAt: string;
}

export const emptyUser: IUser = {
    email: '',
    username: '',
    password: '',
    age: 0,
    gender: Gender.FEMALE,
    objetiveWeight: 0,
    photo: '',
    createdAt: '',
}