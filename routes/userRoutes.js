const router = require('express').Router()
const { User, Rating } = require('../models')

router.get('/users', (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

router.post('/users', (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

// POST for login
router.post('/users/login', (req, res) => {
  User.findOne({ where: req.body, include: [Rating] })
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

module.exports = router