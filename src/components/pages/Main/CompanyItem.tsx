import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CompanyRes } from "../../../redux/userSlice";
import { api } from "../../../redux/UserService";
import ModalCompany from "../../ModalCompany";
import { useSnackBarError } from "../../../hooks/useSnackBarError";

interface ICompanyItem {
  company: CompanyRes;
}

export default function CompanyItem({ company }: ICompanyItem) {
  const [openModalEditCompany, setOpenModalEditCompany] = React.useState(false);
  const [deleteCompany, { isError, error }] = api.useDeleteCompanyMutation();
  useSnackBarError(isError, error);
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h5" textAlign="center">
                  {company.name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="20%">
                <Typography variant="h6" textAlign="center">
                  Description
                </Typography>
              </TableCell>
              <TableCell>{company.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" textAlign="center">
                  Address
                </Typography>
              </TableCell>
              <TableCell>{company.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" textAlign="center">
                  Service of activity
                </Typography>
              </TableCell>
              <TableCell>{company.serviceOfActivity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" textAlign="center">
                  Type
                </Typography>
              </TableCell>
              <TableCell>{company.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" textAlign="center">
                  Number of employees
                </Typography>
              </TableCell>
              <TableCell>{company.numberOfEmployees}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="end" marginY={2}>
          <Box>
            <Button
              sx={{ width: 80 }}
              onClick={() => setOpenModalEditCompany(true)}
              variant="contained"
            >
              Edit
            </Button>
            <ModalCompany
              company={company}
              edit={true}
              open={openModalEditCompany}
              setOpen={setOpenModalEditCompany}
            />
          </Box>
          <Box marginLeft={1}>
            <Button
              sx={{ width: 80 }}
              onClick={() => deleteCompany(company.id)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
