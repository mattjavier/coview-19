const router = require('express').Router()

router.use('/api', require('./businessRoutes.js'))
router.use('/api', require('./ratingRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router