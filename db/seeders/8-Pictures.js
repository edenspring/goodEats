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
    return queryInterface.bulkInsert('Pictures', [
      {src:'../../assets/bills-chicken-cooked.jpg', alt: 'Beer can chicken cooked', recipeId: 3, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/bills-chicken-raw.jpg', alt: 'Beer can chicken raw', recipeId: 3, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/bills-chicken-raw-grill.jpg', alt: 'Beer can chicken placed on the grill', recipeId: 3, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/grilled-cheese.jpg', alt: 'Grilled Cheese', recipeId: 2, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/scrambled-eggs.jpg', alt: 'Scrambled Eggs', recipeId: 1, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/bills-grilled-veggies.jpg', alt: 'Grilled Veggies', recipeId: 4, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/tacos_1.jpg', alt: 'Marinade ready to blend', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/tacos_2.jpg', alt: 'Steaks on the grill', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/tacos_3.jpg', alt: 'Grillin tortillas!', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      {src:'../../assets/tacos_4.jpg', alt: 'The finished product', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Pictures', null, {});
  }
};
