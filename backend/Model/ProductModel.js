import mongoose from "mongoose";

const { model, Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    subTitle: {
      type: String,
      required: false,
      trim: true,
      maxLength: 200,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    productIsNew: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], // ✅ Array of image paths
      default: [],
    },

    reviews: [{}],
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
