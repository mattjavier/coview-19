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
    rating: DataTypes.FLOAT,
    allowNull: false
  },
  maskRating: {
    rating: DataTypes.FLOAT,
    allowNull: false
  },
  sanitationRating: {
    rating: DataTypes.FLOAT,
    allowNull: false
  },
  socialdistanceRating: {
    rating: DataTypes.FLOAT,
    allowNull: false
  },
  comment: {
    text: DataTypes.FLOAT,
    allowNull: false
  }



}, { sequelize, modelName: 'rating' })

module.exports = Rating