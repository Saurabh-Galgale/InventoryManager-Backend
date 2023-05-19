const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
  },
  quantity: {
    type: Number,
    required: [true, "Please add a quantity"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  image: {
    type: String,
    default: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
  },
},
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
