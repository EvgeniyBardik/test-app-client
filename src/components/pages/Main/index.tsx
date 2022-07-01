import { api } from "../../../redux/UserService";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import ModalCompany from "../../ModalCompany";
import { useState } from "react";
import { Order } from "./types/order-company.types";
import { CompaniesList } from "./CompaniesList/CompaniesList";

function Main() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const makeQuery = (orderBy: string, order: string) => {
    const orderQuery = order.toUpperCase();
    return { sort: orderBy, order: orderQuery };
  };
  const [openModalEditCompany, setOpenModalEditCompany] = useState(false);
  const { data: companies, isLoading } = api.useGetCompaniesQuery(
    makeQuery(orderBy, order)
  );

  return (
    <>
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={5} width="100%">
          <CircularProgress />
        </Box>
      )}
      <Grid item xs={12}>
        {!!companies?.length && (
          <CompaniesList
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            companies={companies}
          />
        )}
        <Box
          display="flex"
          justifyContent="end"
          alignItems="baseline"
          width="100%"
        >
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => setOpenModalEditCompany(true)}
          >
            Create Company
          </Button>
          <ModalCompany
            open={openModalEditCompany}
            setOpen={setOpenModalEditCompany}
          />
        </Box>
      </Grid>
    </>
  );
}

export default Main;
