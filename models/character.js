const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    char_class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spec: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ilvl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current_m_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    region:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    realm:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'character',
  }
);
module.exports = Character;
