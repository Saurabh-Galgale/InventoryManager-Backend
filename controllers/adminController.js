const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};


const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!email) {
      return res.status(422).json({ status: false, message: "Missing email." });
    }
    if (!name && !password) {
      return res.status(422).json({ status: false, message: "Missing credentials." });
    }

    const existingadmin = await Admin.findOne({ email }).exec();
    if (existingadmin) {
      return res.status(409).json({
        status: false,
        message: "Email is already in use."
      });
    }

    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name,
      email,
      password: encryptedPassword
    })

    let saved = await admin.save();

    if (!saved) {
      res.json({ message: "Not able to save admin!" });
    } else {
      res.json({
        status: true,
        message: "admin registered successfully!",
        data: {
          id: admin._id,
          email: admin.email,
          name: admin.name
        }
      });
    }
  } catch (error) {
    res.status(400).json({ status: false, message: "Something went wrong", "Error": error.message });
  }
};


const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ status: false, message: "Missing email." });
    }
    if (!password) {
      return res.status(422).json({ status: false, message: "Missing password." });
    }

    const admin = await Admin.findOne({ email });

    if (admin) {

      const validPassword = await bcrypt.compare(password, admin.password);

      if (validPassword) {
        res.json({
          status: true,
          message: "Loggedin successfully!",
          data: {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            token: generateToken(admin._id)
          }
        });
      } else {
        res.json({ status: false, message: "Invalid Password" });
      }
    } else {
      res.json({ status: false, message: "admin not found!" });
    }

  } catch (error) {
    res.status(400).json({ status: false, message: "Something went wrong", "Error": error.message });
  }
};


module.exports = {
  register,
  login,
};

