import { SerializedError } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
interface CustomError {
  data: { statusCode: number; message: string; error: string };
  status: number;
}

export const useSnackBarError = (
  error: SerializedError | CustomError | undefined,
  isError?: boolean
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (error && "data" in error) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
        onClick: () => closeSnackbar(),
      });
    } else if (error) {
      enqueueSnackbar("Network error, try again", {
        variant: "error",
        onClick: () => closeSnackbar(),
      });
    }
  }, [error, enqueueSnackbar, closeSnackbar]);
  return closeSnackbar;
};
