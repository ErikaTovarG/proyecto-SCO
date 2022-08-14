const router = require("express").Router();
const userController = require("../controllers/userControllers.js");
const logDBMiddleware = require("../middlewares/logDBMiddlewares.js");
const validateCreate = require("../middlewares/validator/userMiddlewares.js");
const emailPassMiddlewares = require("../middlewares/email-passMiddlewares.js");

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/create', validateCreate.create, userController.createUser);
router.post('/login', validateCreate.userLogin, userController.userLogin);
router.put('/edit/:id', userController.editUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router