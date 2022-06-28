import { Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const AccessDenied = () => {
  return (
    <Container maxWidth={"xs"}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item>
          <Typography variant="h1">Page not found...</Typography>
          <Grid item>
            <Typography variant="body1">
              <Link component={RouterLink} to={"/login"}>
                Return
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccessDenied;
