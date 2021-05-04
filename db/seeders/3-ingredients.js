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
    return queryInterface.bulkInsert('Ingredients', [
      {name: 'Eggs', measurements: '2', recipeId: 1, createdAt: new Date(), updatedAt: new Date(), },
      {name: 'Butter', measurements: '1 tbsp', recipeId: 1, createdAt: new Date(), updatedAt: new Date(), },
      {name: 'Bread', measurements: '2 Slices', recipeId: 2, createdAt: new Date(), updatedAt: new Date(), },
      {name: 'Cheese', measurements: '2 Slices', recipeId: 2, createdAt: new Date(), updatedAt: new Date(), },
      {name: 'Mayonaise', measurements: 'Only a little bit', recipeId: 2, createdAt: new Date(), updatedAt: new Date(), },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
