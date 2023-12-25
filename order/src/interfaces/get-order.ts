import { Order } from "@prisma/client";

export interface IOrderGetResponse {
    status: number;
    message: string;
    data: Order;
    errors: { [key: string]: any };
}

export interface IOrderGetsResponse {
    status: number;
    message: string;
    data: Order[];
    errors: { [key: string]: any };
}