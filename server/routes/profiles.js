const express = require('express')

const router = express.Router()

const ProfilesControllers = require('../controllers/profiles')


router.post('', ProfilesControllers.createProfile);

router.get('', ProfilesControllers.getProfiles);

module.exports = router;