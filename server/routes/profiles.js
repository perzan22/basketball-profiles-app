const express = require('express')
const multer = require('multer')

const router = express.Router()

const ProfilesControllers = require('../controllers/profiles')


router.post('', multer().none(), ProfilesControllers.createProfile);

router.get('', ProfilesControllers.getProfiles);

router.delete('/:id', ProfilesControllers.deleteProfile)

module.exports = router;