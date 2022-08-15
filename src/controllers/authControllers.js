const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userServices = require("../services/userServices.js");
const tokenServices = require("../services/tokenServices.js");
const { validationResult } = require("express-validator");
const msg = "error";
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      let error = validationResult(req);
      console.log(error);
      if (!error.isEmpty()) {
        return res.status(404).json({
          error: "Error de la validacion",
        });
      } else {
        let { email, password } = req.body;
        let user = await userServices.getByEmail(email);
        console.log(user);
        if (!user) {
          return res.status(404).json({
            error: "Credenciales incorrectas",
          });
        } else {
          let valPass = bcrypt.compareSync(password, user.password);
          if (!valPass) {
            return res.status(200).json({
              error: "Credenciales incorrectas",
            });
          } else {
            const accessToken = JWT.sign(
              { email: email, id: user.id },
              process.env.SECRET_KEY,
              {
                expiresIn: "20m",
              }
            );
            const refreshToken = JWT.sign(
              { email: email, id: user.id },
              process.env.SECRET_KEY,
              {
                expiresIn: "2h",
              }
            );
            await tokenServices.create(refreshToken);
            return res.status(200).json({
              msg: "Exito",
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          }
        }
      }
    } catch (e) {
      res.status(500).json({
        message: msg,
        error: e,
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      let refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        res.status(404).json({
          message: "token not found",
        });
      } else {
        let token = await tokenServices.getToken(refreshToken);
        if (!token) {
          return res.status(403).json({
            message: "No estas autorizado",
          });
        } else {
          const user = JWT.verify(refreshToken, process.env.SECRET_KEY);
          const { email, id } = user;
          const newAccessToken = JWT.sign(
            {
              email,
              id,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "20m",
            }
          );
          return res.status(200).json({
            accessToken: newAccessToken,
          });
        }
      }
    } catch (e) {
      res.status(500).json({
        message: msg,
        error: e,
      });
    }
  },
  deleteToken: async (req, res) => {
    try {
      let refreshToken = req.body.refreshToken;
      await tokenServices.delete(refreshToken);
      res.status(200).json({
        message: "Token borrado",
      });
    } catch (e) {
      res.status(500).json({
        message: msg,
        error: e,
      });
    }
  },
};
