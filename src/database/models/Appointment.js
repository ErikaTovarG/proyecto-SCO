module.exports = (sequelize, DataTypes) => {
    let alias = "Appointment";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING(100),
        },
        id_user: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: "id"
            }
        },
        id_teacher: {
            type: DataTypes.INTEGER,
            references: {
                model: "Teacher",
                key: "id"
            }
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        deleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    };
    let config = {
        tableName: "records",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Appointment = sequelize.define(alias, cols, config);

    return Appointment;
};