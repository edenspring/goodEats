'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeBox = sequelize.define('RecipeBox', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  RecipeBox.associate = function(models) {
    // associations can be defined here
  };
  return RecipeBox;
};