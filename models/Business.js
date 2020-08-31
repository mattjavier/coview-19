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
  averageRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  },
  averageMaskRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  },
  avberageSanitationRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  },
  averageSocialdistanceRating: {
    location: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize, modelName: 'business' })

module.exports = Business