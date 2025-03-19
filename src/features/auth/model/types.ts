import { User } from "@/shared/model/user";
export interface AuthResponse {
  accessToken: string;
  user: User;
}

export type AuthResult = AuthResponse | { error: string };