export interface IProductUpdateResponse {
    status: number;
    message: string;
    errors: {  [key: string]: any }
}