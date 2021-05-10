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
      return queryInterface.bulkInsert('Like', [
        {userId: 1, recipeId: 1, createdAt: new Date(), updatedAt: new Date()}
        {userId: 2, recipeId: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, recipeId: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, recipeId: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, recipeId: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 1, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 2, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, recipeId: 2, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, recipeId: 2, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 3, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 4, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, recipeId: 5, createdAt: new Date(), updatedAt: new Date()},
      ]);
  },
  
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Like', null, {});
  }
};
