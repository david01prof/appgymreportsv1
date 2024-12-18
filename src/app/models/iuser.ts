import { Gender, IGenderSelect } from "./ireport";

export interface IUser {
    email: string;
    username: string;
    password: string;
    age: number;
    gender: IGenderSelect;
    objetiveWeight: number;
    actualWeight: number;
    photo: string;
    createdAt: string;
}

export const emptyUser: IUser = {
    email: '',
    username: '',
    password: '',
    age: 0,
    gender:  {name: 'Femenino', code: Gender.FEMALE },
    objetiveWeight: 0,
    actualWeight: 0,
    photo: '',
    createdAt: '',
}