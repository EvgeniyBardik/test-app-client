import { red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a0dab",
    },
    secondary: {
      main: "#19857b",
    },
    info: {
      main: yellow.A400,
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      margin: "1rem 0",
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
});

export default theme;
