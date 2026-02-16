
import api from '../../api/axios';
import type { IProduct } from '../../types/product';

export const productService = async () => {
    const response = await api.get<IProduct[]>('/products/');

    return response.data;
};