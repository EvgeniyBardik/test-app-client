import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { api } from "../redux/UserService";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import NotFound from "../components/pages/NotFound";
import Main from "../components/pages/Main";
import { PrivateRoute } from "../guards/PrivateRoute";
import { ROLE } from "../redux/interfaces/redux.interfaces";
import Profile from "../components/pages/Profile";

const Root = () => {
  const { isLoading } = api.useCheckAuthQuery("");
  if (isLoading) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="main"
          element={
            <PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Main} />
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Profile} />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* <Route
          path="users"
          element={
            <PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Users} />
          }
        /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
