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
      {
        specification: "First prepare your brine solution by adding the bay leaves and 1/2 cup kosher salt to 6 cups water",
        listOrder: 1,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Next remove the neck and other giblets from the chicken",
        listOrder: 2,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place the chicken in the brine solution and allow it to rest for at least 30 minutes but up to an hour",
        listOrder: 3,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "While the chicken brines, prepare the other spices by mixing together in a bowl",
        listOrder: 4,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "While the chicken brines, prepare the other spices by mixing together in a bowl",
        listOrder: 5,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "After the rub is created, get your grill heated to a medium heat with two zones for cooking: a hot zone where the charcoal burns and a cool zone where the chicken will cook. Place a grill-safe pan beneath the cool zone to catch any drippings",
        listOrder: 6,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Rub the entire chicken with the vegetable oil. Be sure to get oil inside the cavity of the bird as well as both on top of and underneath the skin",
        listOrder: 7,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Aggressively apply the spice rub to all areas of the bird. Make sure to get the inside and outside of the skin touching as much of the meat with the rub as possible",
        listOrder: 8,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Open the can of beer as normal, then use a can opener to get the top cleanly off. Drink or pour out half of the beer",
        listOrder: 9,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Place the chicken on top of the open can of beer that it can stand on its own",
        listOrder: 10,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "On your pre-heated grill place the chicken over the cool side and let sit with the breast side facing the direction of the coals",
        listOrder: 11,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "Be sure to rotate the chicken every 30-45 minutes to ensure even cooking, once the temperature of the meat reads at least 160 the chicken can be removed from the heat and allowed to rest",
        listOrder: 12,
        recipeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        specification: "After resting for at least 15 minutes, carve and serve",
        listOrder: 13,
        recipeId: 3,
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
      */
      return queryInterface.bulkDelete('Instructions', null, {});
  },
};
