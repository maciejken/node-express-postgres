'use strict';
const bcrypt = require('bcrypt-nodejs');

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

    User.associate = function (models) {
        models.User.hasMany(models.Todo, {
            foreignKey: 'userId',
            as: 'todos'
        });
    };

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    User.beforeCreate(function (user) {
        user.password = User.generateHash(user.password);
    });

    User.beforeUpdate(function (user) {
        user.password = User.generateHash(user.password);
    });

    return User;
};
