const userServices = require("../services/userServices.js");
const msg = "error";
const { validationResult } = require("express-validator");

module.exports = {
    getUsers: async (req, res) => {
        try {
            let users = await userServices.getUsersAll();
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
    getUser: async (req, res) => {
        try {
            let userReq = req.params.id
            let user = await userServices.getUserUnique(userReq)
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
    },
    createUser: async (req, res) => {
        try {
            let { email } = req.body
            let user = await userServices.getUserEmail(email);
            if(user){
                res.status(200).json({
                    message: 'El usuario ya existe'
                })
            }else{
                await userServices.createUser(req.body);
                res.status(200).json({
                    message: 'Creando usuario con exito!'
                })
            }
        }catch(e) {
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    }, 
    userLogin: async (req, res) => {
        try {
            let error = validationResult(req)
            let {email, password} = req.body
            let user = await userServices.getUserEmail(email)
            if(error.isEmpty()){
                if(user){
                    if(password == user.password){
                        res.status(200).json({
                            message: 'Puede loguearse'
                        })
                    }else{
                        res.status(404).json({
                            message: 'Datos incorrectos'
                        })
                    }
                }else{
                    res.status(404).json({
                        message: 'Datos incorrectos'
                    })
                }
            }else{
                res.status(500).json({
                    error: error
                })
            }
        }catch (e) {
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    },
    editUser: async (req, res) => {
        try {
            let body = req.body
            let edit = req.params.id
            await userServices.editUser(body, edit);
            res.status(200).json({
                message: 'Modificando usuario con exito!'
            })

        }catch (e){
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            let userId = req.params.id
            await userServices.deleteUser(userId);
            res.status(200).json({
                message: 'El usuario se ha eliminado!'
            })
        }catch (e){
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    }
}