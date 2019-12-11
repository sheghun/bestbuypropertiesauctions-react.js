declare interface Category {
    id: number;
    title: string;
}

declare interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    properties: {size: string; condition: string; transmission: string; year: string};
    featuredImage: string;
    images: Array<string>;
    category: Category;
}

declare interface Category {
    id: number;
    title: string;
}
