module.exports = (sequelize, DataTypes) => {
    let alias = "Token";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        }, 
        token: {
            type: DataTypes.STRING(300),
        }
    };
    let config = {
        tableName: "tokens",
        timestamps: false,
    };

    const Token = sequelize.define(alias, cols, config)
    return Token;
}