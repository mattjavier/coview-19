const Business = require('./Business.js')
const Rating = require('./Rating.js')
const User = require('./User.js')

User.hasMany(Rating)
Business.hasMany(Rating)

Rating.belongsTo(User)
Rating.belongsTo(Business)

module.exports = { Business, Rating, User}