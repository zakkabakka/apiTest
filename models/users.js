'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.BOOLEAN
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};