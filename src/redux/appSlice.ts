import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface CustomError {
  data: { statusCode: number; message: string; error: string };
  status: number;
}
type SliceState = {
  error: SerializedError | CustomError | undefined;
};
const initialState: SliceState = {
  error: undefined,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addError(
      state,
      {
        payload,
      }: PayloadAction<{
        error: SerializedError | CustomError | undefined;
      }>
    ) {
      const { error } = payload;
      state.error = error;
    },
  },
});

export const { addError } = slice.actions;

export default slice.reducer;

export const selectError = (state: RootState) => state.app.error;
