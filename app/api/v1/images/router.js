const express = require('express')
const router = express()
const { create } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

const upload = require('../../../middlewares/multer')

router.post('/images', authenticateUser, authorizeRoles('organizer'), upload.single('avatar'), create)

module.exports = router