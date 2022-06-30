import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  main: {
    minHeight: "75vh",
  },
  footer: {
    marginLeft: 24,
    marginTop: 15,
    textAlign: "center",
  },
}));
export default useStyles;
