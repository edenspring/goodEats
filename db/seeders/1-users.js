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
      {username: 'grillbill', email:'grill@bill.grill', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'only_veggies', email:'veggiemeister@veggie.love', hashedPassword: '$2a$10$ZlwKf8v2sXGGvXkv.hyXx.2u5/NbVph30nrjHb/tx/am31D5UvB0C', createdAt: new Date(), updatedAt: new Date(),},
      {username: 'tastyqueen', email:'tastyqueen@tasty.queen', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'yummeryummo', email:'yumbelina@yumtown.com', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'spicymeatball', email:'thats@spicy.meat', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'billadams', email:'bill@adams.bill', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'melonniehicks', email:'melonnie@mel.hicks', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'nathanmac', email:'nathan@mac.nathan', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
      {username: 'estherkang', email:'esther@hyeri.kang', hashedPassword: bcrypt.hashSync('P@ssword!!', 10), createdAt: new Date(), updatedAt: new Date(),},
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
