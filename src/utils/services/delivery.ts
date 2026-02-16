import api from "../../api/axios";


export const deliveryService = async (orderData: any) => {
    const response = await api.post('/delivery/', orderData);
    return response.data;

};