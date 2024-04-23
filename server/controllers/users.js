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

exports.loginUser = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                throw new Error("Not existing email!")
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Not valid password!'
                });

            }
            const token = jwt.sign({ email: fetchedUser.email, userID: fetchedUser._id, name: fetchedUser.name, surname: fetchedUser.surname }, 
            'SECRET_PHRASE_LONG_ENOUGH_to_BE_VALID_SECRET_KEY_OR_NOT');
            res.status(200).json({
                token: token,
                userID: fetchedUser._id,
                name: fetchedUser.name,
                surname: fetchedUser.surname
            })

        })
        .catch(() => {
            return res.status(401).json({
                message: 'Invalid authentication credentials'
            })
        })
}