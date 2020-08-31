const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Rating extends Model { }

Rating.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overallRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  maskRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sanitationRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  socialDistanceRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'type' })

module.exports = Rating