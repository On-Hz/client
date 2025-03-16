export interface User {
  id: number;
  email: string;
  userName: string;
  profilePath: string | null;
  socialType: string;
  role: string;
  social: boolean;
}
