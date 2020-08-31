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
<<<<<<< HEAD
  averageMask: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  averageSanitation: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  averageSocialdistance: {
=======
  avgMaskRating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  avgSanitation: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  avgSocialDistance: {
>>>>>>> 08251c894b5e549afcb54adef6879117b15e59a3
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, { sequelize, modelName: 'business' })

module.exports = Business