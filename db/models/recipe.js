'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
  };
  return Recipe;
};