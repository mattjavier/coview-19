const router = require('express').Router()
const { Business, Rating } = require('../models')

// GET all businesses
router.get('/businesses', (req, res) => {
  Business.findAll({ include: [Rating] })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, or name ('/api/businesses/:name/:type/:city/:state')
router.post('/businesses/get', (req, res) => {
  Business.findAll({
    where: req.body,
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET businesses that match exactly this
router.get('/businesses/:name/:type/:city/:state', (req, res) => {
  Business.findAll({
    where: { name: req.params.name, type: req.params.type, city: req.params.city, state: req.params.state },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all business types
router.get('/business-types', (req, res) => {
  Business.findAll({
    attributes: ['type'],
    group: ['type']
  })
    .then(types => res.json(types))
    .catch(err => console.log(err))
})

// GET all business locations, all cities should show up once
router.get('/business-locations', (req, res) => {
  Business.findAll({
    attributes: ['city', 'state'],
    group: ['city', 'state']
  })
    .then(locations => res.json(locations))
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

module.exports = router