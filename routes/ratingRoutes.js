const router = require('express').Router()
const { Rating, Business } = require('../models')
const sequelize = require('../db')

// GET ratings
router.get('/ratings', (req, res) => {
  Rating.findAll({ include: [Business] })
    .then(ratings => res.json(ratings))
    .catch(err => console.log(err))
})

// POST new ratings
router.post('/ratings', (req, res) => {
  Rating.create(req.body)
    .then(rating => {
      Rating.findOne({ where: { id: rating.id }, include: [Business] })
        .then(individualRating => res.json(individualRating))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// GET ratings for one business 
router.get('/ratings/:businessId', (req, res) => {
  Rating.findAll({ where: { businessId: req.params.businessId }, include: [Business] })
    .then(ratings => res.json(ratings))
    .catch(err => console.log(err))

})

// GET average ratings for businesses
router.get('/ratings/avg/:businessId', (req, res) => {
  sequelize.query(`SELECT businessId, AVG(overallRating) AS overall, AVG(maskRating) AS mask, AVG(sanitationRating) AS sanitation, AVG(socialDistanceRating) AS social FROM ratings WHERE businessId = ${req.params.businessId}`)
    .then(averages => res.json(averages))
    .catch(err => console.log(err))
})

router.get('/ratings/avg-overall/:businessId', (req, res) => {
  Rating.findAll({
    attributes: [[sequelize.fn('avg', sequelize.col('overallRating')), 'overall_rating']],
    where: { businessId: req.params.businessId },
    raw: true,
  })
    .then(averages => res.json(averages))
    .catch(err => console.log(err))
})

router.get('/ratings/avg-mask/:businessId', (req, res) => {
  Rating.findAll({
    attributes: [[sequelize.fn('avg', sequelize.col('maskRating')), 'mask_rating']],
    where: { businessId: req.params.businessId },
    raw: true,
  })
    .then(averages => res.json(averages))
    .catch(err => console.log(err))
})

router.get('/ratings/avg-sanitation/:businessId', (req, res) => {
  Rating.findAll({
    attributes: [[sequelize.fn('avg', sequelize.col('sanitationRating')), 'sanitation_rating']],
    where: { businessId: req.params.businessId },
    raw: true,
  })
    .then(averages => res.json(averages))
    .catch(err => console.log(err))
})

router.get('/ratings/avg-social/:businessId', (req, res) => {
  Rating.findAll({
    attributes: [[sequelize.fn('avg', sequelize.col('socialDistanceRating')), 'social_rating']],
    where: { businessId: req.params.businessId },
    raw: true,
  })
    .then(averages => res.json(averages))
    .catch(err => console.log(err))
})

module.exports = router