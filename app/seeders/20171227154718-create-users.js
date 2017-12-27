'use strict';
const bCrypt = require('bcrypt-nodejs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'test@test.pl',
            password: generateHash('test123'),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', [{
            email: 'test@test.pl'
        }], {});
    }
};

const generateHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};
