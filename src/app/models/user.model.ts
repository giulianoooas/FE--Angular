export interface User{
  userId: number;
  password: string;
  email: string;
  userStatus: UserStatus;
}

export enum UserStatus {
  LIBRARY = 'library',
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export const UserStatusArray = [UserStatus.ADMIN, UserStatus.CUSTOMER, UserStatus.LIBRARY];
