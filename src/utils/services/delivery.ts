import api from "../../api/axios";


export const deliveryService = {
  create: async (orderData: any) => {
    const response = await api.post('/delivery/', orderData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/delivery/');
    return response.data;
  },
};