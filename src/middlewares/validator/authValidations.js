const { check } = require("express-validator");

module.exports = {
  login: [
    check("email")
      .notEmpty()
      .withMessage("Debe agregar un email")
      .bail()
      .isEmail()
      .withMessage("No es un email valido")
      .trim()
      .escape(),
    check("password").notEmpty().trim().escape(),
  ],
  refresh: [
    check("email")
      .notEmpty()
      .withMessage("Debe agregar un email")
      .bail()
      .isEmail()
      .withMessage("No es un email valido")
      .trim()
      .escape(),
  ],
};
