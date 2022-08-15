const db = require("../database/models");
module.exports = {
  getToken: async (token) => {
    return await db.Token.findOne({
      where: { token: token },
    });
  },
  create: async (token) => {
    await db.Token.create({
        token: token
    });
  },
  delete: async (token) => {
    await db.Token.destroy({
      where: { token: token },
      force: true,
    });
  },
};
