const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            surname: req.body.surname
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            })
        })
    })
}