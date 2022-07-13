import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import {
  LoginRequest,
  UserResponse,
  User,
  CompanyReq,
  CompanyRes,
  EditCompanyReq,
  UserReq,
  QueryReqSort,
} from "./interfaces/redux.interfaces";
import { RootState } from "./store";
import IFormValues from "../components/pages/Signup/interface/form.interface";

interface CustomError {
  data: { statusCode: number; message: string; error: string };
  status: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ["Companies", "Users"],
  endpoints: (build) => ({
    profile: build.query<User, string>({
      query: () => ({
        url: "users/profile",
      }),
      providesTags: (result) => ["Users"],
    }),
    checkAuth: build.query<User, string>({
      query: () => ({
        url: "auth/check",
      }),
    }),
    loginUser: build.mutation<UserResponse, LoginRequest>({
      query: (userLoginData) => ({
        url: "auth/signin",
        method: "POST",
        body: userLoginData,
      }),
      invalidatesTags: ["Companies", "Users"],
    }),
    signUpUser: build.mutation<UserResponse, IFormValues>({
      query: (userSignUpData) => ({
        url: "auth/signup",
        method: "POST",
        body: userSignUpData,
      }),
      invalidatesTags: ["Users", "Companies"],
    }),
    logoutUser: build.mutation<User, string>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
      invalidatesTags: ["Users", "Companies"],
    }),
    logoutAndDeleteUser: build.mutation<User, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users", "Companies"],
    }),
    editUser: build.mutation<User, UserReq>({
      query: (userEditData) => ({
        url: `users/${userEditData.id}`,
        method: "PATCH",
        body: userEditData,
      }),
      invalidatesTags: ["Users"],
    }),
    getCompanies: build.query<CompanyRes[], QueryReqSort>({
      query: (query) => ({
        url: `companies`,
        method: "GET",
        params: {
          sort: query.sort,
          order: query.order,
        },
      }),
      providesTags: (result) => ["Companies"],
    }),
    getUsers: build.query<User[], QueryReqSort>({
      query: (query) => ({
        url: `users`,
        method: "GET",
        params: {
          sort: query.sort,
          order: query.order,
        },
      }),
      providesTags: (result) => ["Users"],
    }),
    deleteUser: build.mutation<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users", "Companies"],
    }),
    getUser: build.query<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: (result) => ["Users"],
    }),
    deleteCompany: build.mutation<CompanyRes, number>({
      query: (id) => ({
        url: `companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Companies"],
    }),
    getCompany: build.query<CompanyRes, number>({
      query: (id) => ({
        url: `companies/${id}`,
        method: "GET",
      }),
      providesTags: (result) => ["Companies"],
    }),
    editCompany: build.mutation<User, EditCompanyReq>({
      query: (params) => ({
        url: `companies/${params.id}`,
        method: "PATCH",
        body: params.company,
      }),
      invalidatesTags: ["Companies"],
    }),
    createCompany: build.mutation<CompanyRes, CompanyReq>({
      query: (companyData) => ({
        url: `companies`,
        method: "POST",
        body: companyData,
      }),
      invalidatesTags: ["Companies"],
    }),
  }),
});
