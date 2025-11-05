import React, { useState } from "react";
import axios from "axios";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { api, API } from "../../ApiRoute/ApiRoute";
import { errorToast } from "../../Component/Helpers/Messages";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New password is required")
      .test(
        "strong-password",
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character",
        (value) =>
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(value || "")
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
     const { data } = await api.put(API.RESET, {
  newPassword: values.newPassword,
  confirmPassword: values.confirmPassword,
});

      if (data?.error) {
        errorToast(data.error);
        setErrors({ newPassword: data.error });
      } else {
        sucessToast(data.message || "Password reset successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        const msg = error.response.data.error.toLowerCase();
        if (msg.includes("password"))
          setErrors({ newPassword: error.response.data.error });
        else setErrors({ confirmPassword: error.response.data.error });
        errorToast(error.response.data.error);
      } else {
        errorToast("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <Field
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                className="w-full p-2 border rounded pr-10"
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showNewPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-orange-500 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
