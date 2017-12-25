const usersController = require('../controllers/index.js').users;
const todosController = require('../controllers/index.js').todos;

module.exports = function (app) {

    app.get('/api', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    app.post('/api/users', usersController.createUser);
    app.get('/api/users', usersController.getUsers);
    app.get('/api/users/todos', usersController.getUsersWithTodos);
    app.get('/api/users/:id', usersController.getUser);
    app.get('/api/users/:id/todos', usersController.getUserWithTodos);
    app.get('/api/users/:id', usersController.updateUser);
    app.delete('/api/users/:id', usersController.deleteUser);

    app.post('/api/todos', todosController.createTodo);
    app.get('/api/todos', todosController.getTodos);
    app.get('/api/todos/:id', todosController.getTodo);
    app.put('/api/todos/:id', todosController.updateTodo);
    app.delete('/api/todos/:id', todosController.deleteTodo);

    app.all('/api/users/:id/todos', function (req, res) {
        res.status(405).send({message: 'Method Not Allowed'});
    });
};