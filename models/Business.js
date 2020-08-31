const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Business extends Model { }

Business.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  averageRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  avgMaskRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  avgSanitation: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  avgSocialDistance: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, { sequelize, modelName: 'business' })

module.exports = Business