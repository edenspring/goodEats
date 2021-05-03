'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeBoxJoinTable = sequelize.define('RecipeBoxJoinTable', {
    recipeId: DataTypes.INTEGER,
    recipeBoxId: DataTypes.INTEGER
  }, {});
  RecipeBoxJoinTable.associate = function(models) {
    // associations can be defined here
  };
  return RecipeBoxJoinTable;
};