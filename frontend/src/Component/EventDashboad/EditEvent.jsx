import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import { sucessToast, errorToast } from "../Helpers/Messages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { api } from "../../ApiRoute/ApiRoute";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  // ✅ Fetch single event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/event/${id}`);
        console.log(res)
        setEvent(res.data.event);
        setExistingImages(res.data.event.images || []);
      } catch (err) {
        errorToast("Failed to load event");
      }
    };
    fetchEvent();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title required"),
    destination: Yup.string().required("Destination required"),
    startDate: Yup.string().required("Start Date required"),
    endDate: Yup.string().required("End Date required"),
    activities: Yup.string().required("Activities required"),
    notes: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // ✅ text fields
      formData.append("title", values.title);
      formData.append("destination", values.destination);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("notes", values.notes || "");

      // ✅ activities field as JSON array
      const activitiesArray = values.activities
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
      formData.append("activities", JSON.stringify(activitiesArray));

      // ✅ images
      newFiles.forEach((file) => formData.append("images", file));

      const res = await api.put(`/event/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      sucessToast(res.data.message || "Event updated!");
      navigate("/event/view");
    } catch (err) {
      errorToast(err.response?.data?.error || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!event) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-8">Loading event...</div>
      </div>
    );
  }

  return (
    <div className="flex bg-stone-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto p-8 bg-white mt-8 rounded-2xl shadow">
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Edit Event
        </h2>

        <Formik
          enableReinitialize
 

          initialValues={{
            title: event.title || "",
            destination: event.destination || "",
            startDate: event.startDate
    ? new Date(event.startDate).toISOString().split("T")[0]
    : "",
  endDate: event.endDate
    ? new Date(event.endDate).toISOString().split("T")[0]
    : "",
            activities: event.activities ? event.activities.join(", ") : "",
            notes: event.notes || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Title */}
              <div>
                <label className="font-semibold">Title</label>
                <Field
                  name="title"
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="font-semibold">Destination</label>
                <Field
                  name="destination"
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Start Date</label>
                  <Field
                    name="startDate"
                    type="date"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold">End Date</label>
                  <Field
                    name="endDate"
                    type="date"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Activities */}
              <div>
                <label className="font-semibold">
                  Activities (comma separated)
                </label>
                <Field
                  name="activities"
                  type="text"
                  placeholder="e.g. hiking, sightseeing, fun"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="activities"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="font-semibold">Notes</label>
                <Field
                  as="textarea"
                  name="notes"
                  rows="4"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Existing Images */}
              <div>
                <label className="font-semibold">Existing Images</label>
               {/* Existing Images */}
<div>
 
  <div className="flex flex-wrap gap-3 mt-2">
    {existingImages.map((img, i) => (
      <div key={i} className="relative">
        <img
          src={img}
          alt=""
          className="h-24 w-24 object-cover rounded border"
        />
        <button
          type="button"
          onClick={() =>
            setExistingImages(existingImages.filter((_, idx) => idx !== i))
          }
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5"
        >
          &times;
        </button>
      </div>
    ))}
  </div>
</div>

              </div>

              {/* Add New Images */}
              <div>
                <label className="font-semibold">Add New Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setNewFiles([...newFiles, ...e.target.files])
                  }
                  className="w-full p-2 border rounded-lg"
                />
                <div className="flex gap-2 mt-2">
                  {newFiles.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="h-24 w-24 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
              >
                {isSubmitting ? "Updating..." : "Update Event"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEvent;
