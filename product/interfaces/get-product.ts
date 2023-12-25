import { Product } from "@prisma/client";

export interface IProductGetResponse {
    status: number;
    message: string;
    data: Product;
    errors: {  [key: string]: any }
}

export interface IProductGetsResponse {
    status: number;
    message: string;
    data: Product[];
    errors: {  [key: string]: any }
}