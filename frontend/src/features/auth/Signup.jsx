import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { API, api } from "../../ApiRoute/ApiRoute";
import { errorToast,sucessToast } from "../../Component/Helpers/Messages";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .test(
        "strong-password",
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character",
        (value) =>
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(value || "")
      ),
  });

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    setLoading(true);
    try {
      // Direct API call using custom axios instance
      const { data } = await api.post(API.PRESIGN, {
        email: values.email,
        password: values.password,
      });

      if (data?.error) {
        const msg = data.error.toLowerCase();
        if (msg.includes("password")) setErrors({ password: data.error });
        else if (msg.includes("email")) setErrors({ email: data.error });
        else errorToast(data.error);
      } else {
        sucessToast(data.message || "Signup successful! Please verify your email.");
        navigate("/login");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);
      errorToast(
        error.response?.data?.error || error.message || "Signup failed"
      );
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-100 via-white to-orange-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-orange-500">
          Create an Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Email */}
              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="peer h-12 w-full px-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <label className="absolute left-3 -top-2 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-orange-500">
                  Email Address
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Field
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="peer h-12 w-full px-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <label className="absolute left-3 -top-2 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-orange-500">
                  Password
                </label>
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-orange-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaRegEye /> : <FaEyeSlash />}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full py-3 px-4 bg-orange-500 text-white hover:bg-orange-600 rounded-lg shadow-md font-semibold transition duration-200"
              >
                {isSubmitting || loading ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
