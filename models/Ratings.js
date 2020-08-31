const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Rating extends Model { }

Rating.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeBusiness: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overallRating: {
    type: DataTypes.INTEGER,
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
  },
  username: {
    location: DataTypes.STRING,
    allowNull: false
  }



}, { sequelize, modelName: 'rating' })

module.exports = Rating