'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeBox = sequelize.define('RecipeBox', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  RecipeBox.associate = function(models) {
    RecipeBox.belongsTo(models.User, { foreignKey: "userId" });
    RecipeBox.belongsToMany(models.Recipe, {
      through: "RecipeBoxJoinTable",
      otherKey: "recipeId",
      foreignKey: "recipeBoxId"
    })
  };
  return RecipeBox;
};
