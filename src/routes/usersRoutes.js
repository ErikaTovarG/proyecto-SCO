const router = require("express").Router();
const userController = require("../controllers/userControllers.js");
const userValidation = require("../middlewares/validator/userValidations.js");
const verifyToken = require("../middlewares/validator/verifyToken.js");


router.get('/', verifyToken, userController.getAll);
router.get('/:id', verifyToken, userController.getOne);
router.post('/create', userValidation.create, userController.create);
router.put('/edit/:id', verifyToken, userController.edit);
router.delete('/delete/:id', userController.delete);

module.exports = router