import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { logout } from "./userSlice";

const rtkQueryErrorLogout: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      next(logout());
    }
  }
  return next(action);
};
export default rtkQueryErrorLogout;
