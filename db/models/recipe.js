'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Recipe.associate = function (models) {
    Recipe.belongsTo(models.User, { foreignKey: "userId" });
    Recipe.hasMany(models.Ingredient, { foreignKey: "recipeId" });
    Recipe.hasMany(models.Instruction, { foreignKey: "recipeId" });
    Recipe.hasMany(models.Review, { foreignKey: "recipeId" });
    Recipe.hasMany(models.Like, { foreignKey: "recipeId" });
    Recipe.hasMany(models.Picture, { foreignKey: "recipeId" })
    Recipe.belongsToMany(models.RecipeBox, {
      through: "RecipeBoxJoinTable",
      otherKey: "recipeBoxId",
      foreignKey: "recipeId"
    })
  };
  return Recipe;
};
