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
    return queryInterface.bulkInsert('Reviews', [
      {review: 'Maybe the best eggs I\'ve ever had', userId: 2, username: 'grillbill', recipeId: 1, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'Gonna grill me a cheese when I get a chance!', userId: 2, username: 'grillbill', recipeId: 1, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'This chicken changed my life :\')', userId: 1, username: 'demoguy', recipeId: 3, createdAt: new Date(), updatedAt: new Date(),},
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
