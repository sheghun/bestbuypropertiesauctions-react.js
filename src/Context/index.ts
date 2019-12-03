import {createContext} from 'react';

const adminObject = {
    categories: [] as Array<Category>,
};

export const AdminContext = createContext(adminObject);
