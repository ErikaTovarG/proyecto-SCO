const router = require("express").Router();

const teacherController = require("../controllers/teacherControllers.js")

router.get('/', teacherController.getTeachers);

module.exports = router