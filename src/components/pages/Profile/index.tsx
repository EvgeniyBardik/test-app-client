import { api } from "../../../redux/UserService";
import { useSnackBarError } from "../../../hooks/useSnackBarError";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ModalUser from "../../ModalUser";
import { useState } from "react";

function Profile() {
  const [logoutAndDelete, { isError, error }] =
    api.useLogoutAndDeleteUserMutation();
  const { data: user } = api.useProfileQuery("");
  const [openModalEditUser, setOpenModalEditUser] = useState(false);
  const fullName = user?.firstName + " " + user?.lastName;
  const closeSnakbarError = useSnackBarError(isError, error);
  const removeProfileHandler = async (id: number) => {
    closeSnakbarError();
    await logoutAndDelete(id);
  };
  console.log(user);
  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={5} width="100%">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5" textAlign="center">
                    {fullName}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width="20%">
                  <Typography variant="h6" textAlign="center">
                    Nick name
                  </Typography>
                </TableCell>
                <TableCell>{user.nickName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" textAlign="center">
                    Description
                  </Typography>
                </TableCell>
                <TableCell>{user.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" textAlign="center">
                    Position
                  </Typography>
                </TableCell>
                <TableCell>{user.position}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" textAlign="center">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" textAlign="center">
                    Phone number
                  </Typography>
                </TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="end" marginY={2}>
            <Box>
              <Button
                sx={{ width: 80 }}
                onClick={() => setOpenModalEditUser(true)}
                variant="contained"
              >
                Edit
              </Button>
              <ModalUser
                user={user}
                open={openModalEditUser}
                setOpen={setOpenModalEditUser}
              />
            </Box>
            <Box marginLeft={1}>
              <Button
                sx={{ width: 80 }}
                onClick={() => removeProfileHandler(user.id)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default Profile;
