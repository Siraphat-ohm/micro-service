export interface IOrderUpdateResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}