import { User } from "@prisma/client";

export interface IUserGetResponse {
    status: number;
    message: string;
    data: User
    errors: {  [key: string]: any }
}

export interface IUserGetsResponse {
    status: number;
    message: string;
    data: User[]
    errors: {  [key: string]: any }
}
