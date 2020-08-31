const router = require('express').Router()

router.use('/api')

router.use('/', require('./viewRoutes.js'))