const userServices = require("../services/userServices.js");
const msg = "error";

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
            let creation = req.body
            await userServices.createUser(creation);
            res.status(200).json({
                message: 'Creando usuario con exito!'
            })
        }catch(e) {
            res.status(500).json({
                message: msg,
                error: e,
            })
        }
    }, 
    viewUserEdit: async (req, res) => {
        try{
            let user = req.params.id
            let nextEdit = await userServices.viewUserEdit(user);
            if(nextEdit){
                res.status(200).json({
                    data: nextEdit
                })
            }else{
                res.status(404).json({
                    message: 'User not found!'
                })
            }
        }catch(e){
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
    viewUserDelete: async(req, res) => {
        try {
            let userId = req.params.id;
            let nextDelet = await userServices.viewUserDelete(userId);
            if(nextDelet){
                res.status(200).json({
                    message: '¿Es el usuario que desea eliminar?',
                    data: nextDelet
                })
            }else{
                res.status(404).json({
                    message: 'User not found!'
                })
            }
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