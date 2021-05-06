'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    src: {
      type: DataTypes.STRING(500),
      allowNull:false,
    },
    alt: {
      type: DataTypes.STRING(100)
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  Picture.associate = function(models) {
    // associations can be defined here
    Picture.belongsTo(models.Recipe, { foreignKey: 'recipeId' })
  };
  return Picture;
};
