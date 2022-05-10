const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const courseRouter = require('./courseRouter')

router.use(userRouter)
router.use(courseRouter)

/// เพื่อดูสถานะการทำ Router ตรงนี้ว่าสำเร็จไหม
router.use('/server-status', (req, res) => {
    res.status(200).send('Active')
})

router.use('/*', (req, res) => {
    res.status(404).send('Not found.')
})

module.exports = router