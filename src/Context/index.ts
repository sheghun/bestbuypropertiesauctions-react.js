import {createContext} from 'react';

const adminObject = {
    categories: [] as Array<Category>,
    products: [] as Array<Product>,
    setProducts: (() => {}) as any,
    setCategories: (() => {}) as any,
};

export const AdminContext = createContext(adminObject);
