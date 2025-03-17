export interface Artist {
  id: number;
  name: string;
  bio?: string;
  profilePath: string | null;
  createdAt: string;
  country?: string;
  role?: string;
}
