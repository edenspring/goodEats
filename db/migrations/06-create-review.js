'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      review: {
        allowNull:false,
        type: Sequelize.TEXT,
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING(35),
      },
      recipeId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {model: 'Recipes'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
