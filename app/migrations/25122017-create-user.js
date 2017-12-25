module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Todos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstname: {
                type: Sequelize.STRING,
                notEmpty: true,
            },
            lastname: {
                type: Sequelize.STRING,
                notEmpty: true,
            },
            username: {
                type: Sequelize.TEXT,
            },
            about: {
                type: Sequelize.TEXT,
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true,
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_login: {
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Todos'),
};