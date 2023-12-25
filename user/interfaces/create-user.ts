import { User } from "@prisma/client";

export interface IUserCreateResponse { 
    status: number;
    message: string;
    data: User
    errors: {  [key: string]: any }
}