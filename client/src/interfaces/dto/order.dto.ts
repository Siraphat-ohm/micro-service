import { IOrder } from '../order.interface';

export interface IOrderCreateResponse {
    status: number;
    message: string;
    data: IOrder;
    errors: { [key: string]: any };
}

export interface IOrderGetResponse {
    status: number;
    message: string;
    data: IOrder;
    errors: { [key: string]: any };
}

export interface IOrderGetsResponse {
    status: number;
    message: string;
    data: IOrder[];
    errors: { [key: string]: any };
}

export interface IOrderUpdateResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}

export interface IOrderDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}