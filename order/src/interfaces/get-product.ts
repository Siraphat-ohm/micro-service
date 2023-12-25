interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export interface IProductGetResponse {
    status: number;
    message: string;
    data: Product;
    errors: { [key: string]: any };
}