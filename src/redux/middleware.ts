import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { logout } from "./userSlice";
import { addError } from "./appSlice";

const rtkQueryErrorHandler: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      next(logout());
    } else {
      next(addError({ error: action.payload }));
    }
  }
  return next(action);
};
export default rtkQueryErrorHandler;
