import Layout from "../../Layout";
import { api } from "../../../redux/UserService";
import { useSnackBarError } from "../../../hooks/useSnackBarError";
import { Box, Button, CircularProgress } from "@mui/material";
import CompanyItem from "./CompanyItem";
import ModalCompany from "../../ModalCompany";
import { useState } from "react";

function Main() {
  const [openModalEditCompany, setOpenModalEditCompany] = useState(false);
  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = api.useGetCompaniesQuery("");
  useSnackBarError(isError, error);

  return (
    <>
      <Layout>
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={5} width="100%">
            <CircularProgress />
          </Box>
        )}

        {companies?.length
          ? companies.map((company) => (
              <CompanyItem company={company} key={company.name} />
            ))
          : null}
        <Box
          display="flex"
          justifyContent="end"
          alignItems="baseline"
          mt={5}
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
