const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  const { name, category, quantity, price, description, image } = req.body;

  if (!name || !category || !quantity || !price || !description) {
    console.log(req.body);
    return res.status(400).json({ status: false, message: "Please fill in all fields" });
  }
  try {
    const product = await Product.create({
      admin: req.Admin.id,
      name,
      category,
      quantity,
      price,
      description,
      image,
    });

    if (product) {
      res.status(201).json(product);
    }
  } catch (error) {
    res.status(401).json({ status: false, message: "Something went wrong!", "Error": error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ admin: req.Admin.id }).sort("-createdAt").populate("admin");
    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({ status: false, message: "Something went wrong!", "Error": error.message });
  }
};


const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }
  
    if(product) {
    res.status(200).json(product);
    }
  } catch (error) {
    res.status(401).json({ status: false, message: "Something went wrong!", "Error": error.message });
  }
 
};


const updateProduct = async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name: name || product.name,
        category: category || product.category,
        quantity: quantity || product.quantity,
        price: price || product.price,
        description: description || product.description
      },
    );

    if(updatedProduct) {
      return res.status(200).json(updatedProduct);
    }

  } catch (error) {
    res.status(401).json({ status: false, message: "Something went wrong!" });
  }

};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne({_id: req.params.id});

    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted." });
  } catch (error) {
    res.status(401).json({ status: false, message: "Something went wrong!", "Error": error.message });
  }
};


module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
