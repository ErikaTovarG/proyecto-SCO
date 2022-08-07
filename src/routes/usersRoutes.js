const router = require("express").Router();
const userController = require("../controllers/userControllers.js")

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/create',userController.createUser);
router.get('/edit/:id', userController.viewUserEdit);
router.put('/edit/:id', userController.editUser);
router.get('/delete/:id', userController.viewUserDelete);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router