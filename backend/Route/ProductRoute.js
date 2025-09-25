import express from "express";
const ProductRoutes = express.Router();
import * as prod from "../Controller/ProductCountroler.js";
import { upload } from "../Middleware/Multer.js";

ProductRoutes.post("/add-product", upload.array("images", 5), prod.AddProduct);


ProductRoutes.get("/fetch", prod.fetchProduct);


ProductRoutes.get("/:id", prod.getProductById);
ProductRoutes.delete("/:id", prod.DeleteProduct);

// Update product (with image upload support)
ProductRoutes.put("/:id", upload.array("images"), prod.UpdateProduct);

export default ProductRoutes;
