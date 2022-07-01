import Root from "./root";
import { useSnackBarError } from "./hooks/useSnackBarError";
import { useSelector } from "react-redux";
import { selectError } from "./redux/appSlice";

function App() {
  const error = useSelector(selectError);
  useSnackBarError(error);
  return <Root />;
}

export default App;
