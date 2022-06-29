export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}
export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
};
export interface User {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  nickName: string;
  description: string;
  position: string;
  firstName: string;
  lastName: string;
  logoutTime?: number;
  role: ROLE;
}
export interface UserReq {
  id: number;
  email: string;
  phoneNumber: string;
  nickName: string;
  description: string;
  position: string;
  firstName: string;
  lastName: string;
}
export interface CompanyReq {
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  type: string;
  description: string;
}
export interface CompanyRes {
  id: number;
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  type: string;
  description: string;
  userId: number;
}
export interface EditCompanyReq {
  id: number;
  company: CompanyReq;
}
export interface EditUserReq {
  id: number;
  user: User;
}

export interface QueryReqSortCompany {
  sort: string;
  order: string;
}
