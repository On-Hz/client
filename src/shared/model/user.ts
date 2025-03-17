export interface User {
  id: number;
  email: string;
  userName: string;
  profilePath: string | null;
  socialType: "naver" | "google" | "kakao" | "none"; 
  role: string;
  social: boolean;
}
