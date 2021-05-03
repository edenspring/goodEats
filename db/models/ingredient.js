'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    measurements: DataTypes.TEXT,
    recipeId: DataTypes.INTEGER
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
  };
  return Ingredient;
};