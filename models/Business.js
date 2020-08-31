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
  averageRating: {
    rating: DataTypes.FLOAT,
    allowNull: false
  },
  averageMask: {
    rating: DataTypes.FLOAT,
    allowNull: false
  },
  averageSanitation: {
    rating: DataTypes.FLOAT,
    allowNull: false
  },
  averageSocialdistance: {
    rating: DataTypes.FLOAT,
    allowNull: false
  }
}, { sequelize, modelName: 'business' })

module.exports = Business