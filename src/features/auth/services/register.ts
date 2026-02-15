import api from "../../../api/axios";
import type { IUser } from "../../../types/user";

export const registerService = async (userData: IUser) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};