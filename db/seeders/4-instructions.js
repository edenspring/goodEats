"use strict";

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
    return queryInterface.bulkInsert("Instructions", [
      {
        specification: "Crack eggs into bowl, beat well",
        listOrder: 1,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Pour mixture into cold pan, add butter",
        listOrder: 2,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Gently cook over medium heat, stirring well",
        listOrder: 3,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "When eggs have formed up to desired consistency, remove from heat and serve",
        listOrder: 4,
        recipeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Lightly spread mayonaise on one side of both pieces of bread",
        listOrder: 1,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place one piece of mayo'd bread mayo side down into pan heated over medium heat",
        listOrder: 2,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place cheese and other slice of bread on top of bread in pan, mayo side up",
        listOrder: 3,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Once bread begins to crisp and cheese begins to melt, flip to other side",
        listOrder: 4,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Continue cooking until cheese is completely melted and other side is crisp",
        listOrder: 5,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Remove from pan, cut in half and serve",
        listOrder: 6,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
