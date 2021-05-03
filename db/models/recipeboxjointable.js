'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeBoxJoinTable = sequelize.define('RecipeBoxJoinTable', {
    recipeId: {
    type: DataTypes.INTEGER
    },
    recipeBoxId: {
      type: DataTypes.INTEGER
    }
  }, {});
  RecipeBoxJoinTable.associate = function(models) {
    // associations can be defined here
  };
  return RecipeBoxJoinTable;
};
