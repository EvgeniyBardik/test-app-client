import { useState } from "react";
import { api } from "../../../redux/UserService";
import { Order } from "./types/users-list.types";
import { useSnackBarError } from "../../../hooks/useSnackBarError";
import { Box, CircularProgress, Grid } from "@mui/material";
import { UsersList } from "./UsersList/UsersList";

const Users = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("email");
  const makeQuery = (orderBy: string, order: string) => {
    const orderQuery = order.toUpperCase();
    return { sort: orderBy, order: orderQuery };
  };
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = api.useGetUsersQuery(makeQuery(orderBy, order));
  useSnackBarError(isError, error);
  return (
    <>
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={5} width="100%">
          <CircularProgress />
        </Box>
      )}
      <Grid item xs={12}>
        {!!users?.length && (
          <UsersList
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            users={users}
          />
        )}
      </Grid>
    </>
  );
};

export default Users;
