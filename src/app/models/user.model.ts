export interface User{
  userId: number;
  firstName: string;
  lastName?: string;
  password: string;
  email: string;
  isAdmin: boolean;
}
