import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { api, API } from "../../ApiRoute/ApiRoute";
import { errorToast } from "../../Component/Helpers/Messages";

const ForgetPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    setLoading(true);
    try {
   const { data } = await api.post(API.FORGET, { email: values.email });

      if (data?.error) {
        setErrors({ email: data.error });
        errorToast(data.error);
      } else {
        sucessToast(data.message || "Reset link sent successfully!");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors({ email: error.response.data.error });
      } else {
        errorToast(error.message);
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPasswordForm;
