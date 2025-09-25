import React from "react";
import { useForgetPassword } from "../../Hook/ForgetPasswordHook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { errorToast, sucessToast } from "../Helpers/Messages";

const ForgetPasswordForm = () => {
  const mutation = useForgetPassword();

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    mutation.mutate(values, {
      onError: (error) => {
        if (error.response?.data?.error) {
          setErrors({ email: error.response.data.error }); // Formik field me show
        } else {
          errorToast(error.message);
        }
        setSubmitting(false);
      },
      onSuccess: (data) => {
        setSubmitting(false);
        sucessToast(data.message || "Reset link sent successfully!");
      },
    });
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
              disabled={isSubmitting || mutation.isLoading}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              {isSubmitting || mutation.isLoading
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPasswordForm;
