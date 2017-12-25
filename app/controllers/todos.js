const Todo = require('../models/index.js').Todo;

module.exports = {

    createTodo(req, res) {
        return Todo.create({
            title: req.body.title,
            userId: req.body.userId
        }).then(function (todo) {
            res.status(201).send(todo);
        }).catch(function (error) {
            res.status(400).send(error)
        });
    },

    getTodos(req, res) {
        return Todo.findAll().then(function (todos) {
            res.status(200).send(todos);
        }).catch(function (error) {
            res.status(400).send(error)
        });
    },

    getTodo(req, res) {
        return Todo.findById(req.params.id).then(function (todo) {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo Not Found',
                });
            } else {
                res.status(200).send(todo);
            }
        }).catch(function (error) {
            res.status(400).send(error)
        });
    },

    updateTodo(req, res) {
        return Todo.findById(req.params.id).then(function (todo) {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo Not Found',
                });
            } else {
                return todo.update({
                    title: req.body.title || todo.title,
                    complete: req.body.complete || todo.complete
                }).then(function (todo) {
                    res.status(200).send(todo);
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        }).catch(function (error) {
            res.status(400).send(error)
        });
    },

    deleteTodo(req, res) {
        return Todo.findById(req.params.id).then(function (todo) {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo Not Found',
                });
            } else {
                return todo.destroy().then(function () {
                    res.status(204).send();
                }).catch(function (error) {
                    res.status(400).send(error);
                });
            }
        }).catch(function (error) {
            res.status(400).send(error)
        });
    }
};