import React, { useState } from "react";
import { useLogin } from "../../Hook/LoginHook";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { errorToast, sucessToast } from "../Helpers/Messages";
import { login } from "../../app/Redux/AuthSlice";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string().required("Password is required"),
    
  });

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    loginMutation.mutate(values, {
      onError: (error) => {
        if (error.response?.data?.error) {
          const msg = error.response.data.error.toLowerCase();

          if (msg.includes("password"))
            setErrors({ password: error.response.data.error });
          else if (msg.includes("user") || msg.includes("email"))
            setErrors({ email: error.response.data.error });
          else setErrors({ email: error.response.data.error });
        } else {
          errorToast(error.message);
        }
        setSubmitting(false);
      },
      onSuccess: (data) => {
        setSubmitting(false);
        sucessToast(data.message || "Login successful!");
        dispatch(
          login({
            user: data.user,
            token: data.token,
          })
        );
        navigate("/");
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-100 via-white to-orange-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[380px]">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-500">
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <Field
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none pr-10"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {passwordVisible ? <FaRegEye /> : <FaEyeSlash />}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Links */}
              <div className="flex justify-between items-center text-sm">
                <Link
                  to="/forget-password"
                  className="text-orange-500 hover:underline"
                >
                  Forgot Password?
                </Link>
                <Link to="/signup" className="text-gray-500 hover:underline">
                  Create Account
                </Link>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting || loginMutation.isLoading}
                className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md"
              >
                {isSubmitting || loginMutation.isLoading
                  ? "Logging in..."
                  : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
