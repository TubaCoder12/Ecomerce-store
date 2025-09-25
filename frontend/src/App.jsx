import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./Component/Navbar/Navbar";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import Home from "./Component/Home/Home";
import ActivateAccount from "./Component/ActiveAccount/ActivateAccount";
import ForgetPasswordForm from "./Component/ForgetPassword/ForgetPassword";
import AccessAccount from "./Component/AccessAcount/AccessAccount";
import ResetPassword from "./Component/ResetPassword/ResetPassword";

import { api, API } from "./ApiRoute/ApiRoute";
import { login } from "./app/Redux/AuthSlice";
import Dashboard from "./Component/Dashboard/Dashboard";
import AddProduct from "./Component/ProductDashboad/AddProduct";
import ViewProduct from "./Component/ProductDashboad/ViewProduct";
import EditProduct from "./Component/ProductDashboad/EditProduct";

const App = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

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
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/activate/:token" element={<ActivateAccount />} />
        <Route path="/forget-password" element={<ForgetPasswordForm />} />
        <Route path="/auth/access/:token" element={<AccessAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/view" element={<ViewProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
};

export default App;
