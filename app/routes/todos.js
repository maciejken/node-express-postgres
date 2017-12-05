'use strict';
const Todo = require('../models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
}

module.exports = function (app) {
    /**
     * @apiDefine ApiTodos
     * @apiSuccess {Object} todos List of todos
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [{"id": "1","text":"new todo"}]
     **/
    app.route('/api/todos')
        /**
         * @api {post} /api/todos Create todo
         * @apiName PostTodos
         * @apiGroup Todos
         * @apiUse ApiTodos
         **/
        .post(function (req, res) {
            Todo.create({
                text: req.body.text,
                done: false
            }, function (err, todo) {
                if (err)
                    res.send(err);
                getTodos(res);
            });
        })
        /**
         * @api {get} /api/todos Get todos
         * @apiName GetTodos
         * @apiGroup Todos
         * @apiUse ApiTodos
         **/
        .get(function (req, res) {
            getTodos(res);
        });

    app.route('/api/todos/:todo_id')
        /**
         * @api {delete} /api/todos/:todo_id Delete todo
         * @apiName DeleteTodo
         * @apiParam {Number} todo_id Todos unique ID
         * @apiGroup Todos
         * @apiUse ApiTodos
         **/
        .delete(function (req, res) {
            Todo.remove({
                _id: req.params.todo_id
            }, function (err, todo) {
                if (err) {
                    res.send(err);
                }
                getTodos(res);
            });
        });
};
