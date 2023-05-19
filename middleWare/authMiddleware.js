const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ status: false, message: "Not authorized, no token" });
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await Admin.findById(verified.id);

      if (!admin) {
        res.status(401).json({ status: false, message:"Admin not found" });
      }
      req.Admin = admin;
      next();

    } catch (error) {
      res.status(401).json({ status: false, message:"Sorry, Not authorized" });
    }
  }
};

module.exports = auth;



