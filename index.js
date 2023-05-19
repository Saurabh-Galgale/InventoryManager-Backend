const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use("/api", adminRoute);
app.use("/api", productRoute);


app.get("/", (req, res) => {
  res.send("<h1>Welcome to Inventory Manager</h1>");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bqgmeka.mongodb.net/InventoryManager?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
