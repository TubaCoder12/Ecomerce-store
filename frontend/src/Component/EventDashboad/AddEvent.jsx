import React, { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { errorToast, sucessToast } from "../Helpers/Messages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../../ApiRoute/ApiRoute";

const AddEventForm = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    destination: Yup.string().required("Destination is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    activities: Yup.string(), // comma separated
    notes: Yup.string(),
  });

  const initialValues = {
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    activities: "",
    notes: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const formData = new FormData();
    
    // Convert activities string into array
    const activitiesArray = values.activities
      ? values.activities.split(",").map((act) => act.trim())
      : [];
    
    formData.append("title", values.title);
    formData.append("destination", values.destination);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("notes", values.notes);
    formData.append("activities", JSON.stringify(activitiesArray)); // 👈 JSON stringify

    files.forEach((file) => formData.append("images", file));

    const res = await api.post("/event/add-event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    sucessToast(res.data.message || "Event added successfully");
    resetForm();
    setFiles([]);
    navigate("/dashboard"); // redirect after success
  } catch (err) {
    errorToast(err?.response?.data?.error || err.message);
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="flex min-h-screen bg-[#FFF7EB]">
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
          Add New Event
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter event title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <Field
                  type="text"
                  name="destination"
                  placeholder="Enter destination"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="destination"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <Field
                    type="date"
                    name="startDate"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <Field
                    type="date"
                    name="endDate"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activities (comma separated)
                </label>
                <Field
                  type="text"
                  name="activities"
                  placeholder="e.g. hiking, swimming"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  placeholder="Add notes"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setFiles((prev) => [...prev, ...e.target.files])
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-wrap mt-3 gap-3">
                  {files.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="h-32 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Add Event"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEventForm;
