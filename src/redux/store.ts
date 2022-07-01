import { api } from "./UserService";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import authReducer from "./userSlice";
import rtkQueryErrorHandler from "./middleware";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorHandler),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
