const User = require('../models/index.js').User;
const Todo = require('../models/index.js').Todo;

module.exports = {

    createUser(req, res) {
        return User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function (user) {
            res.status(201).send(user);
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    getUsers(req, res) {
        return User.findAll().then(function (users) {
            res.status(200).send(users);
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    getUsersWithTodos(req, res) {
        return User.findAll({
            include: [{
                model: Todo,
                as: 'todos'
            }],
            order: [
                ['createdAt', 'DESC'],
                [{model: Todo, as: 'todos'}, 'createdAt', 'ASC']
            ]
        }).then(function (users) {
            res.status(200).send(users);
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    getUser(req, res) {
        return User.findById(req.params.id).then(function (user) {
            if (!user) {
                res.status(404).send({
                    message: 'User Not Found'
                });
            } else {
                res.status(200).send(user);
            }
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    getUserWithTodos(req, res) {
        return User.findById(req.params.id, {
                include: [{
                    model: Todo,
                    as: 'todos'
                }]
            }
        ).then(function (user) {
            if (!user) {
                res.status(404).send({
                    message: 'User Not Found'
                });
            } else {
                res.status(200).send(user);
            }
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    updateUser(req, res) {
        return User.findById(req.params.id).then(function (user) {
            if (!user) {
                res.status(404).send({
                    message: 'Todo Not Found'
                });
            } else {
                return user.update(req.body, {fields: Object.keys(req.body)}).then(function (updatedUser) {
                    res.status(200).send(updatedUser);
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    deleteUser(req, res) {
        return User.findById(req.params.id).then(function (user) {
            if (!user) {
                res.status(400).send({
                    message: 'User Not Found'
                });
            } else {
                return user.destroy().then(function () {
                    res.status(204).send();
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        }).catch(function (error) {
            res.status(400).send(error);
        });
    }
};
