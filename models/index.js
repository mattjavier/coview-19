const Business = require('./Business.js')
const Rating = require('./Rating.js')

Business.hasMany(Rating)

Rating.belongsTo(Business)

module.exports = { Business, Rating}