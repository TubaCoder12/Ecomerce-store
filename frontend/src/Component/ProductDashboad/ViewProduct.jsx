import React from "react";
import Sidebar from "../Dashboard/Sidebar";
import { errorToast, sucessToast } from "../Helpers/Messages";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDeleteProduct } from "../../Hook/UseDeleteProduct";
import { useProducts } from "../../Hook/FetchProduct";
import { img_port } from "../../ApiRoute/ApiRoute";

const ViewProduct = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const del = async (id) => {
    try {
      const res = await deleteProduct(id);
      sucessToast(res.message);
    } catch (err) {
      errorToast(err?.response?.data?.error || err.message);
    }
  };

  const getStockBadge = (stock) => {
    if (stock <= 5)
      return "bg-red-600 text-white px-3 py-1 rounded-full text-sm";
    else return "bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm";
  };

  if (isLoading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-8">Loading products...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-8 text-red-500">Failed to load products</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-6">
          View Products
        </h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={
                        product.images[0]
                          ? `${img_port}${product.images[0]}`
                          : "/placeholder.png"
                      }
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-contain"
                    />

                    <div>
                      <div className="text-gray-800 font-medium">
                        {product.title}
                      </div>
                      <div className="text-gray-400 text-sm w-[320px]">
                        {product.subTitle}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStockBadge(product.stock)}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">${product.price}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.discount === 0 ? "N/A" : `${product.discount}%`}
                  </td>
                  <td className="px-6 py-4 flex space-x-1 text-yellow-400">
                    <FaStar />
                    <span className="text-gray-700">
                      {product.rating.toFixed(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4 space-x-2">
                    <span className="flex">
                      <Link
                        to={`/edit-product/${product._id}`}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => del(product._id)}
                        className="px-3 py-1 text-red-600 rounded-lg text-sm flex items-center justify-center"
                      >
                        <MdDelete size={22} />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
              {products?.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
