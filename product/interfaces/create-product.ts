import { Product } from "@prisma/client";

export interface IProductCreateResponse {
    status: number;
    message: string;
    data: Product
    errors: {  [key: string]: any }
}