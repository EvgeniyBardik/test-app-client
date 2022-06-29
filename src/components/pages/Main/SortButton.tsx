import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MouseEventHandler } from "react";

interface ISortButton {
  active: boolean;
  asc: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
}

const SortButton = ({ active, asc, onClick, children }: ISortButton) => {
  let transform = "rotate(180deg)";
  let visibility = "visible";
  if (!active) {
    visibility = "hidden";
  }
  if (asc) {
    transform = "rotate(0deg)";
  }
  return (
    <>
      <Button
        variant="text"
        onClick={onClick}
        endIcon={
          <ExpandMoreIcon
            sx={{ visibility: visibility, transform: transform }}
          />
        }
      >
        {children}
      </Button>
    </>
  );
};

export default SortButton;
