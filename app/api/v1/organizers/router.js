const express = require('express')
const router = express()
const { createCMSOrganizer, createCMSUser } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.get('/users', authenticateUser, authorizeRoles('owner'), createCMSUser);
router.post('/organizers', authenticateUser, authorizeRoles('owner'), createCMSOrganizer)
router.post('/users', authenticateUser, authorizeRoles('organizer'), createCMSUser)

module.exports = router