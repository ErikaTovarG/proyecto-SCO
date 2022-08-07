const {check} = require("express-validator");

module.exports = {
    create: [
        check("name")
            .notEmpty()
            .trim()
            .escape(),
        check("last_name")
            .notEmpty()
            .trim()
            .escape(),
        check("email")
            .notEmpty()
            .isEmail()
            .trim()
            .escape(),
        check("password")
            .notEmpty()
            .isAlphanumeric()
            .trim()
            .escape()
    ],
    userLogin: [
        check("email")
            .notEmpty()
            .withMessage('Debe agregar un email')
            .bail()
            .isEmail()
            .withMessage('No es un email valido')
            .trim()
            .escape(),
        check("password")
            .notEmpty()
            .trim()
            .escape()
    ]
}

