'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, {foreignKey : 'userId'}),
    Like.belongsTo(models.Recipe, {foreignKey : 'recipeId'})
  };
  return Like;
};
