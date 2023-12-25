export interface IUserUpdateResponse {
    status: number;
    message: string;
    errors: {  [key: string]: any }
}