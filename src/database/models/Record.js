module.exports = (sequelize, DataTypes) => {
    let alias = "Record";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING(100),
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        deleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        id_user: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: "id"
            }
        }
    };
    let config = {
        tableName: "records",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Record = sequelize.define(alias, cols, config);

    Record.associate = models => {
        Record.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_user"
        })
    };
    return Record;
};