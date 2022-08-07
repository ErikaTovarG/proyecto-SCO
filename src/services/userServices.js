const db = require("../database/models");

module.exports = {
    getUsersAll: async () => { 
        let users = await db.User.findAll();
        return users
    },
    getUserUnique: async (resId) => {
        let user = await db.User.findOne({ 
            where: { id: resId } 
        })
        return user
    },
    getUserEmail: async (email) => {
        let user = await db.User.findOne({ 
            where: { email: email } 
        })
        return user
    },
    createUser: async (objeto) => {
        await db.User.create(objeto)
    },
    editUser: async (resBody, resId) => {
        await db.User.update(resBody, { 
            where: { id: resId } 
        }) 
    },
    deleteUser: async (userid) => {
        await db.User.destroy({ 
            where: { id: userid } 
        })
    }
}