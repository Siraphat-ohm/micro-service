export interface IProductDeleteResponse {
    status: number;
    message: string;
    errors: {  [key: string]: any }
}