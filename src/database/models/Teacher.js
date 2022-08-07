module.exports = (sequelize, DataTypes) => {
    let alias = "Teacher";
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
        tableName: "teachers",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Teacher = sequelize.define(alias, cols, config);

    Teacher.associate = models => {
        Teacher.belongsToMany(models.User, {
            as: "users",
            through: "appointments",
            foreignKey: "id_teacher",
            otherKey: "id_user"
        })
    };
    return Teacher; 
};