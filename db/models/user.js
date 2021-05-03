'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(35),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Recipe, {foreignKey: 'userId'});
    User.hasMany(models.RecipeBox, {foreignKey: 'userId'});
    User.hasMany(models.Review, {foreignKey: 'userId'});
    User.hasMany(models.Like, {foreignKey: 'userId'});

  };
  return User;
};
