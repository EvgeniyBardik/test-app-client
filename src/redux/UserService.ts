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
  QueryReqSortCompany,
} from "./interfaces/redux.interfaces";
import { RootState } from "./store";
import IFormValues from "../components/pages/Signup/interface/form.interface";

interface CustomError {
  data: { statusCode: number; message: string; error: string };
  status: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ["Companies", "User"],
  endpoints: (build) => ({
    profile: build.query<User, string>({
      query: () => ({
        url: "users/profile",
      }),
      providesTags: (result) => ["User"],
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
    }),
    signUpUser: build.mutation<UserResponse, IFormValues>({
      query: (userSignUpData) => ({
        url: "auth/signup",
        method: "POST",
        body: userSignUpData,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: build.mutation<User, string>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
    logoutAndDeleteUser: build.mutation<User, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    editUser: build.mutation<User, UserReq>({
      query: (userEditData) => ({
        url: `users/${userEditData.id}`,
        method: "PATCH",
        body: userEditData,
      }),
      invalidatesTags: ["User"],
    }),
    getCompanies: build.query<CompanyRes[], QueryReqSortCompany>({
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
    deleteCompany: build.mutation<CompanyRes, number>({
      query: (id) => ({
        url: `companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Companies"],
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
