const express = require('express')

const router = express.Router()

const { courses } = require('../controllers/courseController')

router.get('/courses', courses)

module.exports = router