const User = require('../models/index.js').User;
const Todo = require('../models/index.js').Todo;

module.exports = {

    createUser(req, res) {
        req.checkBody('email', 'Email address in invalid').isEmail().trim().normalizeEmail();
        req.checkBody('password', 'Password is too short').isLength({min: 4});
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return User.find({
                    where: {
                        email: req.body.email
                    }
                }).then(function (user) {
                    if (!user) {
                        return User.create({
                            email: req.body.email,
                            password: req.body.password
                        }).then(function (user) {
                            res.status(201).send(user);
                        }).catch(function (error) {
                            res.status(400).send(error);
                        });
                    } else {
                        res.status(422).send({
                            message: 'User with email: ' + req.body.email + ' already exists'
                        });
                    }
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
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
        req.checkParams('id', 'ID should be the positive integer').isInt({
            min: 1,
            max: 2147483647,
            allow_leading_zeroes: false
        });
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
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
            }
        });
    },

    getUserWithTodos(req, res) {
        req.checkParams('id', 'ID should be the positive integer').isInt({
            min: 1,
            max: 2147483647,
            allow_leading_zeroes: false
        });
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
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
            }
        });
    },

    updateUser(req, res) {
        req.checkParams('id', 'ID should be the positive integer').isInt({
            min: 1,
            max: 2147483647,
            allow_leading_zeroes: false
        });
        req.checkBody('email', 'Email address in invalid').isEmail().trim().normalizeEmail();
        req.checkBody('password', 'Password is too short').isLength({min: 4});
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return User.findById(req.params.id).then(function (user) {
                    if (!user) {
                        res.status(404).send({
                            message: 'Todo Not Found'
                        });
                    } else {
                        return user.update({
                            email: req.body.email,
                            password: req.body.password
                        }).then(function (updatedUser) {
                            res.status(200).send(updatedUser);
                        }).catch(function (error) {
                            res.status(400).send(error);
                        });
                    }
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        });
    },

    deleteUser(req, res) {
        req.checkParams('id', 'ID should be the positive integer').isInt({
            min: 1,
            max: 2147483647,
            allow_leading_zeroes: false
        });
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return User.findById(req.params.id).then(function (user) {
                    if (!user) {
                        res.status(404).send({
                            message: 'User Not Found'
                        });
                    } else {
                        return user.destroy().then(function () {
                            res.status(200).send({message: 'User with id: ' + req.params.id + ' was successfully deleted'});
                        }).catch(function (error) {
                            res.status(400).send(error);
                        });
                    }
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        });
    }
};
