import { makeStyles } from "tss-react/mui";

export const style = {
  position: "absolute" as "absolute",
  top: "0",
  left: "50%",
  transform: "translate(-50%, 0%)",
  width: { xs: 300, sm: 400, md: 500 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
};

const useStyles = makeStyles()((theme) => ({
  link: {
    cursor: "pointer",
  },
}));
export default useStyles;
