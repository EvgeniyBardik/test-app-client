import { Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth={"xs"}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item>
          <Typography variant="h1">Page not found...</Typography>
          <Grid item>
            <Typography variant="body1">
              Return to
              <Link component={RouterLink} to={"/main"}>
                {" "}
                Main{" "}
              </Link>
              page
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
