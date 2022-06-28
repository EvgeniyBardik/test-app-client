import { SerializedError } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
interface CustomError {
  data: { statusCode: number; message: string; error: string };
  status: number;
}

export const useSnackBarError = (
  isError: boolean,
  error: SerializedError | CustomError | undefined
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (isError && error && "data" in error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
        onClick: () => closeSnackbar(),
      });
    } else if (isError && error) {
      enqueueSnackbar("Network error, try again", {
        variant: "error",
        onClick: () => closeSnackbar(),
      });
    }
  }, [isError, error, enqueueSnackbar, closeSnackbar]);
  return closeSnackbar;
};
