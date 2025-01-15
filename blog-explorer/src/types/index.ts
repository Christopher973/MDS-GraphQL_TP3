export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
  posts?: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: User;
}