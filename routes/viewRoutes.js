const router = require('express').Router()
const { join } = require('path')

router.get('/about', (req, res) => {
  res.sendFile(join(__dirname, '../public/lib/about.html'))
})

router.get('/view', (req, res) => {
  res.sendFile(join(__dirname, '../public/lib/viewReviews.html'))
})

router.get('/write', (req, res) => {
  res.sendFile(join(__dirname, '../public/lib/writeReview.html'))
})

router.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'))
})

module.exports = router