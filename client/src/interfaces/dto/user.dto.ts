import { IUser } from "../user.interface"

export interface IUserGetResponse {
    status: number;
    message: string;
    data: IUser;
    errors: { [key: string]: any };
}

export interface IUserGetsResponse {
    status: number;
    message: string;
    data: IUser[];
    errors: { [key: string]: any };
}

export interface IUserCreateResponse {
    status: number;
    message: string;
    data: IUser;
    errors: { [key: string]: any };
}

export interface IUserUpdateResponse {
    status: number;
    message: string;
    data: IUser;
    errors: { [key: string]: any };
}

export interface IUserDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}
