const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(404).json({
        message: "Token not found!",
      });
    }
  
    try {
      const user = await JWT.verify(token, process.env.SECRET_KEY);
      req.user = { email:user.email, id: user.id};
      next();
    } catch (e) {
      res.status(403).json({
        message: "Token invalido",
      });
    }
  };