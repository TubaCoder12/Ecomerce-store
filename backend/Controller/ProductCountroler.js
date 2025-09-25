import Product from "../Model/ProductModel.js";

export const fetchProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.json({
        products,
        product: products.length,
      });
    }
  } catch (error) {
    res.json({
      error: "no product found",
    });
  }
};

export const AddProduct = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      category,
      description,
      price,
      productIsNew,
      onSale,
      rating,
      discount,
      brand,
      stock,
    } = req.body;

    // Multer se files nikal lo
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const product = new Product({
      title,
      subTitle,
      category,
      description,
      price,
      productIsNew,
      onSale,
      rating,
      discount,
      brand,
      stock,
      images, 
    });

    await product.save();

    res.json({
      product,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid);
    res.json({
      product,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from URL params
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.json({
        error: "Product ID not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      error: `${error.message} - Something went wrong`,
    });
  }
};

export const UpdateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Update text fields
    const fields = [
      "title",
      "subTitle",
      "brand",
      "category",
      "description",
      "price",
      "discount",
      "stock",
      "rating",
      "onSale",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    // Handle newly uploaded images
    if (req.files && req.files.length > 0) {
      // Option 1: Replace old images
      product.images = req.files.map((file) => `/uploads/${file.filename}`);

      // Option 2: Merge old + new images
      // product.images = [...product.images, ...req.files.map(file => `/uploads/${file.filename}`)];
    }

    await product.save();

    res.json({
      product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message + " something went wrong",
    });
  }
};
