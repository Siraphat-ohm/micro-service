import { Order } from "@prisma/client";

export interface IOrderCreateResponse {
    status: number;
    message: string;
    data: Order;
    errors: { [key: string]: any };
}