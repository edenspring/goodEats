'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {username: 'demoguy', email:'demo@guy.demo', hashedPassword: bcrypt.hashSync('P@ssword', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'grillbill', email:'grill@bill.grill', hashedPassword: bcrypt.hashSync('P@ssword', 10), createdAt: new Date(), updatedAt: new Date(),},
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
