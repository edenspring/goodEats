'use strict';

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
    return queryInterface.bulkInsert('Recipes', [
      {name: 'Scrambled Eggs', createdAt: new Date(), updatedAt: new Date(), userId: 1 },
      {name: 'Grilled Cheese', createdAt: new Date(), updatedAt: new Date(), userId: 1 },
      {name: 'Beer Can Chicken', createdAt: new Date(), updatedAt: new Date(), userId: 2 }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Recipes', null, {});
  }
};
