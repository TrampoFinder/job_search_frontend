import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectPrivateRoutes } from "./ProtectPrivateRoutes";
import { Login } from "../pages/Login";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      {/* <Route path="sign-in" element={<SignIn />} />
        <Route path="login" element={<Login />} /> */}
      <Route path="profile" element={<ProtectPrivateRoutes />}>
        {/* <Route path="user" element={<UserProfile />} />
        <Route path="admin" element={<AdminProfile />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  );
};
