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
  }
}, { sequelize, modelName: 'business' })

module.exports = Business