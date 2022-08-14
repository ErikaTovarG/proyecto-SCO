const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userServices = require("../services/userServices.js");
const msg = "error";
const { validationResult } = require("express-validator");
require("dotenv").config();

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
            let error = validationResult(req);
            let {password, email} = req.body
            let userFind = await userServices.getUserEmail(email);
            if(!error.isEmpty()){
                res.status(404).json({
                    message: "error"
                })
            } else {
                if(userFind){
                    res.status(200).json({
                        message: 'Ya existe un usuario con ese email'
                    })
                }else{
                    let passEncriptada = bcrypt.hashSync(password, 12);
                    let user = {
                        name: req.body.name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: passEncriptada,
                        phone: req.body.phone,
                    };
                    await userServices.createUser(user);
                    res.status(200).json({
                        message: 'Creando usuario con exito!'
                    })
                }
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
            if(!error.isEmpty()){
                return res.status(404).json({
                    error: 'Error de la validacion'
                })
            }else{
                let {email, password} = req.body
                let user = await userServices.getUserEmail(email)
                if(!user){
                    console.log('aca llegue 2');
                    return res.status(404).json({
                        error: "Credenciales incorrectas"
                    })
                } else {
                    let valPass = bcrypt.compareSync(password, user.password);
                    if(!valPass){
                        return res.status(200).json({
                            error: "Credenciales incorrectas"
                        })
                    }else{
                        const token = JWT.sign(
                            {email: email, id: user.id},
                            process.env.SECRET_KEY,
                            {
                                expiresIn: "20m"
                            }
                        );
                        return res.status(200).json({
                            msg: "Exito",
                            token: token,
                        })
                    }
                }
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