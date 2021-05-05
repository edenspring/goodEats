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
    return queryInterface.bulkInsert('RecipeBoxJoinTables', [
      {recipeId: 1, recipeBoxId: 1, createdAt: new Date(), updatedAt: new Date(),},
      {recipeId: 2, recipeBoxId: 1, createdAt: new Date(), updatedAt: new Date(),}
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('RecipeBoxJoinTables', null, {});
  }
};
