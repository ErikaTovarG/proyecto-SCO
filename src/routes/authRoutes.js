const router = require("express").Router();
const controller = require("../controllers/authControllers");
const validation = require("../middlewares/validator/authValidations");

router
    .post("/login", validation.login, controller.login)
    .post("/refresh",validation.refresh, controller.refreshToken)
    .delete("/delete", controller.deleteToken);


module.exports = router