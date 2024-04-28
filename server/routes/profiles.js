const express = require('express')
const multer = require('multer')
const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

const ProfilesControllers = require('../controllers/profiles')


router.post('', multer().none(), checkAuth, ProfilesControllers.createProfile);

router.get('', ProfilesControllers.getProfiles);

router.delete('/:id', ProfilesControllers.deleteProfile)

module.exports = router;