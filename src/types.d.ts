declare interface Category {
    id: number;
    title: string;
}

declare interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    properties: string;
    featuredImage: string;
    images: Array<string>;
}
