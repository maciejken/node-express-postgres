'use strict';

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastLogin: {
            type: DataTypes.DATE
        }
    });

    User.associate = function(models) {
        models.User.hasMany(models.Todo, {
            foreignKey: 'userId',
            as: 'todos'
        });
    };

    return User;
};
