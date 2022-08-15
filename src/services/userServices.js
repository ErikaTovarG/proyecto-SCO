const db = require("../database/models");
const sequelize = require("sequelize");

module.exports = {
    getAll: async () => { 
        let users = await db.User.findAll({
            attributes: ["id", "name", "last_name", "phone"]
        });
        return users
    },
    getById: async (id) => {
        let user = await db.User.findOne({ 
            where: { id: id } 
        })
        return user
    },
    getByEmail: async (email) => {
        let user = await db.User.findOne({ 
            where: { email: email } 
        })
        return user
    },
    createUser: async (user) => {
        await db.User.create(user)
    },
    editUser: async (body) => {
        let {id}= body;
        delete body.id;
        await db.User.update(body, { 
            where: { id: id } 
        }) 
    },
    deleteUser: async (userid) => {
        await db.User.destroy({ 
            where: { id: userid } 
        })
    }
}