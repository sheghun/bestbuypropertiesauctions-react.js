import {createContext} from 'react';

const adminObject = {
    categories: [] as Array<Category>,
    products: [] as Array<Product>,
};

export const AdminContext = createContext(adminObject);
