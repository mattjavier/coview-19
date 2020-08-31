const router = require('express').Router()
const { Business, Rating } = require('../models')

// GET all businesses
router.get('/businesses', (req, res) => {
  Business.findAll({ include: [Rating] })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// POST new business
router.post('/businesses', (req, res) => {
  Business.create(req.body)
    .then(business => {
      Business.findOne({ where: { id: business.id }, include: [Rating] })
        .then(currentBusiness => res.json(currentBusiness))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// PUT a review a new business
router.put('/businesses/:id', (req, res) => {
  Business.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// GET avg rating

// GET avg mask rating

// GET avg sanitation rating

// GET avg social distancing rating

module.exports = router