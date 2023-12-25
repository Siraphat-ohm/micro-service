import { IProduct } from "../product.interface";

export interface IProductGetResponse {
    status: number;
    message: string;
    data: IProduct;
    errors: { [key: string]: any };
}

export interface IProductGetsResponse {
    status: number;
    message: string;
    data: IProduct[];
    errors: { [key: string]: any };
}

export interface IProductCreateResponse {
    status: number;
    message: string;
    data: IProduct;
    errors: { [key: string]: any };
}

export interface IProductUpdateResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}

export interface IProductDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}