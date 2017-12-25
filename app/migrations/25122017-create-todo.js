module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Todos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: Sequelize.TEXT,
            complete: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            userId: {
                type: DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Todos',
                    key: 'id',
                    as: 'userId',
                },
            }
        }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Todos'),
};