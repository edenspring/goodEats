'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    username:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey: 'userId'});
    Review.belongsTo(models.Recipe, {foreignKey : 'recipeId'})
  };
  return Review;
};
