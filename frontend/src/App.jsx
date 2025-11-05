import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { api, API } from "./ApiRoute/ApiRoute";
import { login } from "./app/Redux/AuthSlice";

import MainLayout from "./Component/Layout/MainLayout";

import Home from "./Component/Home/Home";

import Dashboard from "./Component/Dashboard/Dashboard";
import AddProduct from "./Component/EventDashboad/AddEvent";
import ViewProduct from "./Component/EventDashboad/FeatureEvents";
import EditProduct from "./Component/EventDashboad/EditEvent";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import ActivateAccount from "./features/auth/ActivateAccount";
import ForgetPasswordForm from "./features/auth/ForgetPassword";
import AccessAccount from "./features/auth/AccessAccount";
import ResetPassword from "./features/auth/ResetPassword";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (!token) {
        try {
          const res = await api.post(API.REFRESH);
          dispatch(
            login({
              user: res.data.user,
              token: res.data.token,
              role: res.data.role,
            })
          );
        } catch (err) {
          console.log("Token refresh failed", err);
        }
      }
    };
    refreshAccessToken();
  }, [dispatch, token]);

  return (
    <>
      <ToastContainer />

      {/* Layout-based routing */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event/add" element={<AddProduct />} />
          <Route path="/event/view" element={<ViewProduct />} />
          <Route path="/EditEvent/:id" element={<EditProduct />} />
        </Route>

        {/* Without Layout (Normal Auth Pages) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/activate/:token" element={<ActivateAccount />} />
        <Route path="/forget-password" element={<ForgetPasswordForm />} />
        <Route path="/auth/access/:token" element={<AccessAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
