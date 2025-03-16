import { User } from "@/shared/model/user";


export interface LoginResponse {
  accessToken: string;
  user: User;
}