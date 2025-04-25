import { User } from "@/shared/model/user";
export interface AuthResponse {
  accessToken: string;
  deviceId:string;
  user: User;
}

export type AuthResult = AuthResponse | { error: string };