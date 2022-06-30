import { api } from "./UserService";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import rtkQueryErrorLogout from "./middleware";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogout),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
