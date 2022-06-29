import Layout from "../../Layout";
import { api } from "../../../redux/UserService";
import { useSnackBarError } from "../../../hooks/useSnackBarError";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CompanyItem from "./CompanyItem";
import ModalCompany from "../../ModalCompany";
import { useMemo, useState } from "react";
import { Order } from "./types/order-company.types";
import SortButton from "./SortButton";

const initialStateSort = [
  { name: "newest", active: true },
  { name: "name", active: false },
  { name: "service", active: false },
];

function Main() {
  const [stateSort, setStateSort] = useState(initialStateSort);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("newest");
  const orderHandler = (property: string) => {
    const isOld = orderBy === property;
    const isAsc = isOld && order === "desc";
    setOrder(!isOld || isAsc ? "asc" : "desc");
    setOrderBy(property);
    const newInitialStateSort = initialStateSort.map((item) =>
      item.name === property
        ? { ...item, active: true }
        : { ...item, active: false }
    );
    setStateSort(newInitialStateSort);
  };
  const makeQuery = (orderBy: string, order: string) => {
    const orderQuery = order.toUpperCase();
    const getKey = (orderBy: string) => {
      if (orderBy === "service") {
        return "serviceOfActivity";
      }
      if (orderBy === "newest") {
        return "updatedAt";
      }
      return orderBy;
    };
    return { sort: getKey(orderBy), order: orderQuery };
  };

  const [openModalEditCompany, setOpenModalEditCompany] = useState(false);
  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = api.useGetCompaniesQuery(makeQuery(orderBy, order));
  useSnackBarError(isError, error);
  console.log(order, orderBy);
  console.log(companies);

  return (
    <>
      <Layout>
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={5} width="100%">
            <CircularProgress />
          </Box>
        )}
        {!!companies?.length && (
          <Grid item xs={12}>
            <Paper sx={{ p: 1, px: 3, mb: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Sort by:</Typography>
                <Box>
                  {stateSort.map((item) => (
                    <SortButton
                      key={item.name}
                      active={item.active}
                      asc={order === "asc"}
                      onClick={() => orderHandler(item.name)}
                    >
                      {item.name}
                    </SortButton>
                  ))}
                </Box>
              </Box>
            </Paper>
            {companies.map((company) => (
              <CompanyItem company={company} key={company.name} />
            ))}
          </Grid>
        )}
        <Box
          display="flex"
          justifyContent="end"
          alignItems="baseline"
          mt={2}
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
      </Layout>
    </>
  );
}

export default Main;
