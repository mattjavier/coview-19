const router = require('express').Router()
const { Rating, User, Business } = require('../models')

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
  Rating.findAll({ where: { businessId: req.params.businessId }, include: [Business, User] })
    .then(ratings => res.json(ratings))
    .catch(err => console.log(err))
})

module.exports = router