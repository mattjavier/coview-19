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
  socialdistanceRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  comment: {
    text: DataTypes.FLOAT,
    allowNull: false
  }



}, { sequelize, modelName: 'rating' })

module.exports = Rating