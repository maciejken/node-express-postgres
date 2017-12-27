'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('SELECT id FROM "Users" WHERE email = \'test@test.pl\' ', {
            type: queryInterface.sequelize.QueryTypes.SELECT
        }).then(function (userId) {
            return queryInterface.bulkInsert('Todos', [{
                title: 'Test Todo',
                description: 'It is a test todo',
                userId: userId[0].id,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Todos', [{
            title: 'Test Todo'
        }], {});
    }
};
