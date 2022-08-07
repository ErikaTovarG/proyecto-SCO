module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        last_name: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(150),
        },
        password: {
            type: DataTypes.STRING(150),
        },
        phone: {
            type: DataTypes.STRING(100),
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        deleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    };
    let config = {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.hasMany(models.Record, {
            as: "record",
            foreignKey: "id_user"
        })
        User.belongsToMany(models.Teacher, {
            as: "teachers",
            through: "appointments",
            foreignKey: "id_user",
            otherKey: "id_teacher"
        })
    };
    return User; 
};