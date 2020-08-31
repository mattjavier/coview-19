const router = require('express').Router()
const { Rating, User, Business } = require('../models')
const sequelize = require('../db')

// GET ratings
router.get('/ratings', (req, res) => {
  Rating.findAll({ include: [Business, User] })
    .then(ratings => res.json(ratings))
    .catch(err => console.log(err))
})

// POST new ratings
router.post('/ratings', (req, res) => {
  Rating.create(req.body)
    .then(rating => {
      Rating.findOne({ where: { id: rating.id }, include: [Business, User] })
        .then(individualRating => res.json(individualRating))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// GET ratings for one business 
router.get('/ratings/:businessId', (req, res) => {
  Rating.findOne({ where: { businessId: req.params.businessId }, include: [Business, User] })
    .then(ratings => res.json(ratings))
    .catch(err => console.log(err))
})

// GET average ratings for businesses
router.get('/ratings/avg/:businessId', (req, res) => {
  sequelize.query(`SELECT AVG(overallRating) AS overall, AVG(maskRating) AS mask, AVG(sanitationRating) AS sanitation, AVG(socialDistanceRating) AS social FROM ratings WHERE businessId = ${req.params.businessId}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
})

module.exports = router