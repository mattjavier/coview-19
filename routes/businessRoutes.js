const router = require('express').Router()
const { Business, Rating } = require('../models')

// GET all businesses
router.get('/businesses', (req, res) => {
  Business.findAll({ include: [Rating] })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by type ('/api/businesses/:type')
router.get('/businesses/:type', (req, res) => {
  Business.findAll({
    where: { type: req.params.type },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, name ('/api/businesses/:name')
router.get('/businesses/:name', (req, res) => {
  Business.findAll({
    where: { name: req.params.name },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, name ('/api/businesses/:city')
router.get('/businesses/:city', (req, res) => {
  Business.findAll({
    where: { city: req.params.city },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, name ('/api/businesses/:state')
router.get('/businesses/:state', (req, res) => {
  Business.findAll({
    where: { state: req.params.state },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, name ('/api/businesses/:name/:type')
router.get('/businesses/:name/:type/', (req, res) => {
  Business.findAll({
    where: { name: req.params.name, type: req.params.type },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, name ('/api/businesses/:type/:city')
router.get('/businesses/:type/:city', (req, res) => {
  Business.findAll({
    where: { type: req.params.type, city: req.params.city },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location and state ('/api/businesses/:type/:state')
router.get('/businesses/:type/:state', (req, res) => {
  Business.findAll({
    where: { type: req.params.type, state: req.params.state },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location ('/api/businesses/:city/:state')
router.get('/businesses/:city/:state', (req, res) => {
  Business.findAll({
    where: { city: req.params.city, state: req.params.state },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by type and location ('/api/:type/:city/:state')
router.get('/businesses/:type/:city/:state', (req, res) => {
  Business.findAll({
    where: { type: req.params.type, city: req.params.city, state: req.params.state },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by name, type, and city ('/api/businesses/:name/:type/:city')
router.get('/businesses/:name/:type/:city', (req, res) => {
  Business.findAll({
    where: { name: req.params.name, type: req.params.type, city: req.params.city },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, name ('/api/businesses/:name/:type/:state')
router.get('/businesses/:name/:type/:state', (req, res) => {
  Business.findAll({
    where: { name: req.params.name, type: req.params.type, state: req.params.state },
    include: [Rating]
  })
    .then(businesses => res.json(businesses))
    .catch(err => console.log(err))
})

// GET all businesses by location, type, name ('/api/businesses/:name/:type/:city/:state')
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

// PUT a review a new business
router.put('/businesses/:id', (req, res) => {
  Business.update(req.body, { where: { id: req.params.id } })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router