import { Navigate, Route, Routes } from "react-router-dom";
// import { ProtectPrivateRoutes } from "./ProtectPrivateRoutes";
import { SignIn } from "../pages/SignIn";
import { RegisterUser } from "../pages/RegisterUser";
import { Home } from "../pages/Home";
import { UserProfile } from "../pages/UserProfile";
import { ProtectPrivateRoutes } from "./ProtectPrivateRoutes";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="register" element={<RegisterUser />} />
      <Route path="profile" element={<ProtectPrivateRoutes />}>
        <Route path="user" element={<UserProfile />} />
        {/* <Route path="admin" element={<AdminProfile />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  );
};
