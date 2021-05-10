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
      {review: 'Gonna grill me a cheese when I get a chance!', userId: 2, username: 'grillbill', recipeId: 2, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'This chicken changed my life :\')', userId: 1, username: 'demoguy', recipeId: 3, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'YYYYAAAAASSSS', userId: 3, username: 'only_veggies', recipeId: 4, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'Mother\'s day tacos for the win!!', userId: 7, username: 'billadams', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'I subbed in cauliflower steaks, soooo goooood!', userId: 3, username: 'only_veggies', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'usurped!!! i bow to the greater grill (but rly try my chicken ;D)', userId: 2, username: 'grillbill', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'Eh, it was ok I guess?', userId: 1, username: 'demoguy', recipeId: 5, createdAt: new Date(), updatedAt: new Date(),},
      {review: 'i was a skeptic at first, but buddy i was wrong!', userId: 2, username: 'billadams', recipeId: 1, createdAt: new Date(), updatedAt: new Date(),},
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
