const {check} = require("express-validator");

module.exports = {
    create: [
        check("name")
            .notEmpty()
            .withMessage('Debe agregar un nombre')
            .trim()
            .escape(),
        check("last_name")
            .notEmpty()
            .withMessage('Debe agregar un apellido')
            .trim()
            .escape(),
        check("email")
            .notEmpty()
            .withMessage('Debe agregar un email')
            .isEmail()
            .trim()
            .escape(),
        check("password")
            .notEmpty()
            .withMessage('Debe agregar una contraseña')
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

