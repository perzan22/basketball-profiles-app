const express = require('express')

const router = express.Router()

const ProfilesControllers = require('../controllers/profiles')


router.post('', ProfilesControllers.createProfile);

module.exports = router;