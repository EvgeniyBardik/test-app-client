import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { api } from "../redux/UserService";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import NotFound from "../components/pages/NotFound";
import Main from "../components/pages/Main";
import { PrivateRoute } from "../guards/PrivateRoute";
import { ROLE } from "../redux/interfaces/redux.interfaces";
import Profile from "../components/pages/Profile";
import Layout from "../components/Layout";
import Company from "../components/pages/Company";
import Users from "../components/pages/Users";
import User from "../components/pages/User";

const Root = () => {
  const { isLoading } = api.useCheckAuthQuery("");
  if (isLoading) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="main"
            element={
              <PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Main} />
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute
                roles={[ROLE.ADMIN, ROLE.USER]}
                component={Profile}
              />
            }
          />
          <Route
            path="company/:id"
            element={
              <PrivateRoute
                roles={[ROLE.ADMIN, ROLE.USER]}
                component={Company}
              />
            }
          />
          <Route
            path="users"
            element={<PrivateRoute roles={[ROLE.ADMIN]} component={Users} />}
          />
          <Route
            path="user/:id"
            element={<PrivateRoute roles={[ROLE.ADMIN]} component={User} />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
