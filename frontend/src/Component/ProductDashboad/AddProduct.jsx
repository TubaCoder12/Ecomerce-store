import Sidebar from "../Dashboard/Sidebar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, sucessToast } from "../Helpers/Messages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddProduct } from "../../Hook/AddProduct";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const { mutateAsync: addProduct } = useAddProduct(); // 👈 hook use

  // validation schema (same as tumhara hai)
  const validationSchema = Yup.object({
    title: Yup.string().required("Product title is required"),
    subTitle: Yup.string().required("Subtitle is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required().min(0),
    discount: Yup.number().required().min(0),
    stock: Yup.number().required().min(0),
    rating: Yup.number().required().min(0).max(5),
    onSale: Yup.boolean(),
    productIsNew: Yup.boolean(),
  });

  const initialValues = {
    title: "",
    subTitle: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    rating: "",
    onSale: false,
    productIsNew: false,
  };

  // submit function
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      files.forEach((file) => formData.append("images", file));

      const res = await addProduct(formData);

      sucessToast(res.message || "Product Added");
      resetForm();
      setFiles([]);
      navigate("/product/view");
    } catch (err) {
      errorToast(err?.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-100">
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
          Add New Product
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
                  Product Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter product title"
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
                  Subtitle
                </label>
                <Field
                  type="text"
                  name="subTitle"
                  placeholder="Enter subtitle"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="subTitle"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Field
                    type="text"
                    name="category"
                    placeholder="Product category"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <Field
                    type="text"
                    name="brand"
                    placeholder="Brand name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="brand"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Write a brief description"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Price, Discount, Stock, Rating */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <Field
                    type="number"
                    name="discount"
                    placeholder="Enter discount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="discount"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <Field
                    type="number"
                    name="stock"
                    placeholder="Enter stock"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <Field
                    type="number"
                    name="rating"
                    placeholder="0 to 5"
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 text-gray-700">
                  <Field
                    type="checkbox"
                    name="onSale"
                    className="w-4 h-4 accent-orange-500"
                  />
                  <span>On Sale</span>
                </label>

                <label className="flex items-center space-x-2 text-gray-700">
                  <Field
                    type="checkbox"
                    name="productIsNew"
                    className="w-4 h-4 accent-orange-500"
                  />
                  <span>New Product</span>
                </label>
              </div>

              {/* Multiple Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="images"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Add Product"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductForm;
