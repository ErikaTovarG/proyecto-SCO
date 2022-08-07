const db = require("../database/models");
const msg = "error";

module.exports = {
    getTeachers : async (req, res) => {
        try {
            let teachers = await db.Teacher.findAll()
                res.status(200).json({
                    count: teachers.length,
                    data: teachers,
                })
        }catch(e){
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    },

    getTeacher : async (req, res) => {
        try {
            let getTeacher = await db.Teacher.findByPk(req.params.id);
            if(getTeacher){
                res.status(200).json({
                    data: getTeacher
                })
            }else{
                res.status(404).json({
                    message: 'Teacher not found!'
                })
            }
        }catch (e){
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    }
}