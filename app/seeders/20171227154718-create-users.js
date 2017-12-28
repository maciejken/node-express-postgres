'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            email: 'test@test.pl',
            password: '$2a$08$thQ5ScGzixhpw5itag6wOucnP9Qdi27/zxeVPzIaIXnmJNbZ4eKIS', //test123
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', [{
            email: 'test@test.pl'
        }], {});
    }
};
