const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Api extends Model {}

Api.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'api',
  }

);
module.exports = Api;