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
    type: DataTypes.FLOAT,
    allowNull: false
  },
  averageMask: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  averageSanitation: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  averageSocialdistance: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, { sequelize, modelName: 'business' })

module.exports = Business