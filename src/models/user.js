'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, {foreignKey:'gender',targetKey:'keyMap',as:'genderData'})
      User.belongsTo(models.Allcode, {foreignKey:'roleId',targetKey:'keyMap',as:'positionData'})
      User.hasMany(models.Attendance,{foreignKey:'idUser'})
    }
  };
  User.init({
    rfid:DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};