import React from "react";
import { useProducts } from "../../Hook/FetchProduct";
import { img_port } from "../../ApiRoute/ApiRoute";
import { FaStar } from "react-icons/fa";

const FeatureProduct = () => {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p className="text-red-500">Error fetching products</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col hover:shadow-xl hover:scale-[1.03] transition duration-300"
            >
              {/* Image with badge */}
              <div className="relative w-full h-52 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={
                    product.images[0]
                      ? `${img_port}${product.images[0]}`
                      : "/placeholder.png"
                  }
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
                {product.productIsNew === "true" && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 mt-4">
                {/* Title + Rating */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center text-sm text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < Math.round(product.rating || 0)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    ({product.rating})
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">
                  {product.subTitle}
                </p>

                {/* Price */}
                <p className="text-orange-500 font-bold mt-2 text-lg">
                  Rs {product.price}
                </p>
              </div>

              {/* Add to Cart */}
              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureProduct;
