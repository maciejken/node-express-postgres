const Todo = require('../models/index.js').Todo;

module.exports = {

    createTodo(req, res) {
        const userId = req.user ? req.user.id : req.body.userId;

        return Todo.create({
            title: req.body.title,
            description: req.body.description,
            userId: userId
        }).then(function (todo) {
            res.status(201).send(todo);
        }).catch(function (error) {
            res.status(400).send(error);
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
        return Todo.findById(req.params.id).then(function (todo) {
            if (!todo) {
                res.status(404).send({
                    message: 'Todo Not Found',
                });
            } else {
                res.status(200).send(todo);
            }
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    updateTodo(req, res) {
        return Todo.findById(req.params.id).then(function (todo) {
            if (!todo) {
                res.status(404).send({
                    message: 'Todo Not Found'
                });
            } else {
                return todo.update(req.body, {fields: Object.keys(req.body)}).then(function (updatedTodo) {
                    res.status(200).send(updatedTodo);
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        }).catch(function (error) {
            res.status(400).send(error);
        });
    },

    deleteTodo(req, res) {
        return Todo.findById(req.params.id).then(function (todo) {
            if (!todo) {
                res.status(404).send({
                    message: 'Todo Not Found'
                });
            } else {
                return todo.destroy().then(function () {
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
