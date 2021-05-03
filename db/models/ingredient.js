'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    measurements: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      refereces: { models: "Recipes" }
    }
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
    Ingredient.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
  };
  return Ingredient;
};