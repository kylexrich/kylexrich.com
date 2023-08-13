import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../../config/routes";
import ProtectedRoute from "./ProtectedRoute";

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.secure) {
          return (
            <Route key={index} path={route.path} element={<ProtectedRoute />}>
              <Route index element={<route.component />} />
            </Route>
          );
        } else {
          return <Route key={index} path={route.path} element={<route.component />} />;
        }
      })}
    </Routes>
  );
};

export default Navigation;
