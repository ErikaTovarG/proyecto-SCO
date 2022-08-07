const router = require("express").Router();
const userController = require("../controllers/userControllers.js")

router.get('/', userController.getUsers);

module.exports = router