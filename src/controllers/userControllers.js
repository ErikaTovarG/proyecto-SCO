const bcrypt = require("bcrypt");
const userServices = require("../services/userServices.js");
const msg = "error";
const { validationResult } = require("express-validator");
require("dotenv").config();

module.exports = {
    getAll: async (req, res) => {
        try {
            let users = await userServices.getAll();
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
    getOne: async (req, res) => {
        try {
            let userReq = req.params.id
            let user = await userServices.getById(userReq)
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
    create: async (req, res) => {
        try {
            let error = validationResult(req);
            let {password, email} = req.body
            let userFind = await userServices.getByEmail(email);
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
    edit: async (req, res) => {
        try {
            req.body.id = req.params.id
            let user = await userServices.getById(req.body.id)
            if(!user){
                res.status(200).json({
                    message:'User not found',
                })
            }else{
                await userServices.editUser(req.body);
                res.status(200).json({
                    message: 'Modificando usuario con exito!'
                })
            }
        }catch (e){
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    },
    delete: async (req, res) => {
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