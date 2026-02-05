import { Product } from '@/types';
import axios from 'axios';

const API_URL = 'https://6983fa14885008c00dafbd47.mockapi.io/api';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${API_URL}/product`);
  return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`${API_URL}/product/${id}`);
  return data;
};
