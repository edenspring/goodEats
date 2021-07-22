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
    User.hasMany(models.Recipe, { foreignKey: 'userId' });
    User.hasMany(models.RecipeBox, { foreignKey: 'userId' });
    User.hasMany(models.Review, { foreignKey: 'userId' });
    User.hasMany(models.Like, { foreignKey: 'userId' });
    User.hasMany(models.CookStatus, { foreignKey: 'userId' })
  };

  User.login = async function ({ credential, password }) {
    // ^^ accepts an object with a credntial and password key
   const { Op } = require('sequelize');
   const user = await User.scope('loginUser').findOne({
     // method searches for one User with the specified credential
     where: {
       [Op.or]: {
         username: credential,
         email: credential,
       },
     },
   });
   if (user && user.validatePassword(password)) {
     // ^^ if user is found then validate the password
     // by passing it into the instance's .validatePassword method
     return await User.scope('currentUser').findByPk(user.id);
     //^^ if the password is valid, then return the user by using the currentUser scope
   }
 };
 
  return User;
};
