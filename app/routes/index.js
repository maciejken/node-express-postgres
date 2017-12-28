const usersController = require('../controllers/index.js').users;
const todosController = require('../controllers/index.js').todos;

module.exports = function (app) {

    app.use('/api/*', isLoggedIn);

    app.post('/api/users', usersController.createUser);
    app.get('/api/users', usersController.getUsers);
    app.get('/api/users/todos', usersController.getUsersWithTodos);
    app.get('/api/users/:id', usersController.getUser);
    app.get('/api/users/:id/todos', usersController.getUserWithTodos);
    app.put('/api/users/:id', usersController.updateUser);
    app.delete('/api/users/:id', usersController.deleteUser);

    app.post('/api/todos', todosController.createTodo);
    app.get('/api/todos', todosController.getTodos);
    app.get('/api/todos/:id', todosController.getTodo);
    app.put('/api/todos/:id', todosController.updateTodo);
    app.delete('/api/todos/:id', todosController.deleteTodo);

    app.all('/api/users/:id/todos', function (req, res) {
        res.status(405).send({message: 'Method Not Allowed'});
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    // no stacktraces leaked to user unless in development environment
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({
            status: 'error',
            message: err.message,
            error: (process.env.NODE_ENV === 'development') ? err.stack : {}
        });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({message: 'Unauthorized'});
    }
}
