'use strict';
module.exports = (sequelize, DataTypes) => {
  const CookStatus = sequelize.define('CookStatus', {
    status: {
      allowNull:false,
      type:DataTypes.STRING(40)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    recipeId:  {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {});
  CookStatus.associate = function(models) {
    // associations can be defined here
    CookStatus.belongsTo(models.User, {foreignKey: 'userId'}),
    CookStatus.belongsTo(models.Recipe, {foreignKey: 'recipeId'})
  };
  return CookStatus;
};
