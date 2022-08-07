const db = require("../database/models");
const msg = "error";

module.exports = {
    getUsers: async (req, res)=> {
        try {
            let users = await db.User.findAll();
                res.status(200).json({
                    count : users.length,
                    data: users,
                })
        }catch (e) {
            res.status(500).json({
                message : msg,
                error : e
            })
        }
    }, 

    getUser: async (req, res)=>{
        try {
            let user = await db.User.findOne(req.params.id)
            if(user){
                res.status(200).json({
                    data: user,
                })
            }else{
                res.status(404).json({
                    message: 'User not found!'
                })
            }
        }catch(e){
            res.status(500).json({
                message: msg,
                error: e
            })
        }
    }
}