const express = require('express')
const multer = require('multer')

const router = express.Router()

const UsersController = require('../controllers/users')

router.post('/signup', UsersController.createUser);

module.exports = router;