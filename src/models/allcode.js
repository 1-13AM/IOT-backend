'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User,{foreignKey:'gender',as:'genderData'})
      Allcode.hasMany(models.User,{foreignKey:'roleId',as:'positionData'})
    }
  };
  Allcode.init({
    type: DataTypes.STRING,
    keyMap: DataTypes.STRING,
    valueV: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};