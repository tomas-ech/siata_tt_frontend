import api from "../../api/axios";

export const loginService = async (email: string, pass: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', pass);

    const response = await api.post('/auth/login', formData);
    return response.data; 
}