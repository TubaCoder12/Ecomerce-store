import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { errorToast, sucessToast } from "../Helpers/Messages";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../../Hook/ResetPassword";

const ResetPassword = () => {
  const mutation = useChangePassword();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        setSubmitting(false);
        sucessToast(data.message);
        navigate("/login");
      },
      onError: (error) => {
        setSubmitting(false);
        if (error.response?.data?.error) {
          const msg = error.response.data.error.toLowerCase();
          if (msg.includes("password"))
            setErrors({ newPassword: error.response.data.error });
          else setErrors({ confirmPassword: error.response.data.error });
        } else {
          console.log("Network or other error:", error.message);
          errorToast("Something went wrong. Please try again.");
        }
      },
    });
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
              disabled={isSubmitting || mutation.isLoading}
              className="bg-orange-500 text-white px-4 py-2 rounded w-full"
            >
              {isSubmitting || mutation.isLoading
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
