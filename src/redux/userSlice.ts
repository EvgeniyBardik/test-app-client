import { createSlice } from "@reduxjs/toolkit";
import { api } from "./UserService";
import { RootState } from "./store";
import Cookies from "js-cookie";

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

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: "",
  isAuthenticated: false,
  token: Cookies.get("token") ? JSON.parse(Cookies.get("token")!) : null,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState as AuthState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    //   state.isAuthenticated = false;
    //   Cookies.remove("token");
    // },
    // setAuthenticated: (state) => {
    //   state.isAuthenticated = true;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.loginUser.matchFulfilled,
        (state, { payload: { user, token } }) => {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          Cookies.set("token", JSON.stringify(token));
        }
      )
      .addMatcher(
        api.endpoints.signUpUser.matchFulfilled,
        (state, { payload: { user, token } }) => {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          Cookies.set("token", JSON.stringify(token));
        }
      )
      .addMatcher(
        api.endpoints.profile.matchFulfilled,
        (state, { payload: user }) => {
          state.user = user;
        }
      )
      .addMatcher(api.endpoints.logoutAndDeleteUser.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        Cookies.remove("token");
      })
      .addMatcher(
        api.endpoints.logoutUser.matchFulfilled,
        (state, { payload: user }) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          Cookies.remove("token");
        }
      )
      .addMatcher(
        api.endpoints.checkAuth.matchFulfilled,
        (state, { payload: user }) => {
          state.isAuthenticated = !!user;
          state.user = user;
        }
      );
  },
});

// export const { logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
