'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instruction = sequelize.define('Instruction', {
    specification: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    listOrder: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      refereces: { model: "Recipes" }
    }
  }, {});
  Instruction.associate = function(models) {
    // associations can be defined here
    Instruction.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
  };
  return Instruction;
};