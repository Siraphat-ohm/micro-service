export interface IOrderDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}