const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Business extends Model { }

Business.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeBusiness: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overallRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  },
  maskRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  },
  sanitationRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  },
  socialdistanceRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize, modelName: 'business' })

module.exports = Business