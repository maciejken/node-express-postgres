const Todo = require('../models/index.js').Todo;

module.exports = {

    createTodo(req, res) {
        const userId = req.user ? req.user.id : req.body.userId;
        req.checkBody('title', 'Title should not be empty').notEmpty().trim();
        req.sanitizeBody('description').trim();
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Todo.create({
                    title: req.body.title,
                    description: req.body.description,
                    userId: userId
                }).then(function (todo) {
                    res.status(201).send(todo);
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        });
    },

    getTodos(req, res) {
        return Todo.findAll().then(function (todos) {
            res.status(200).send(todos);
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    getTodo(req, res) {
        req.checkParams('id', 'ID should be the positive integer').isInt({
            min: 1,
            max: 2147483647,
            allow_leading_zeroes: false
        });
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Todo.findById(req.params.id).then(function (todo) {
                    if (!todo) {
                        res.status(404).send({
                            message: 'Todo Not Found'
                        });
                    } else {
                        res.status(200).send(todo);
                    }
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        });
    },

    updateTodo(req, res) {
        const userId = req.user ? req.user.id : req.body.userId;
        req.checkParams('id', 'ID should be the positive integer').isInt({
            min: 1,
            max: 2147483647,
            allow_leading_zeroes: false
        });
        req.checkBody('title', 'Title should not be empty').notEmpty().trim();
        req.sanitizeBody('description').trim();
        req.checkBody('complete', 'Complete should be boolean').isBoolean().trim();
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Todo.findById(req.params.id).then(function (todo) {
                    if (!todo) {
                        res.status(404).send({
                            message: 'Todo Not Found'
                        });
                    } else {
                        return todo.update({
                            title: req.body.title,
                            description: req.body.description,
                            complete: req.body.complete,
                            userId: userId
                        }).then(function (updatedTodo) {
                            res.status(200).send(updatedTodo);
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

    deleteTodo(req, res) {
        req.checkParams('id', 'ID should be the positive integer').isInt({
            min: 1,
            max: 2147483647,
            allow_leading_zeroes: false
        });
        return req.getValidationResult().then(function (errors) {
            if (!errors.isEmpty()) {
                res.status(422).json({errors: errors.array()});
            } else {
                return Todo.findById(req.params.id).then(function (todo) {
                    if (!todo) {
                        res.status(404).send({
                            message: 'Todo Not Found'
                        });
                    } else {
                        return todo.destroy().then(function () {
                            res.status(200).send({message: 'Todo with id: ' + req.params.id + ' was successfully deleted'});
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
