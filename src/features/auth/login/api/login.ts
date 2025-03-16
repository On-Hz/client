
import { axiosInstance } from "@/shared/api/axiosInstance";
import { LoginResponse } from "../model/types";


export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/login", { email, password });
    console.log('repsonse',response);
    return response.data; 
  };