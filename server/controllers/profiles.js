const Profile = require('../models/profile')

exports.createProfile = (req, res, next) => {
    console.log(req.body)
    const profile = new Profile({
        name: req.body.name,
        surname: req.body.surname,
        /*birth: req.body.birth,
        height: req.body.height,
        weight: req.body.weight,
        position: req.body.position,
        strength1: req.body.strength1,
        strength2: req.body.strength2,
        strength3: req.body.strength3,
        description: req.body.description*/
    })

    profile.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Profile added successfully',
            profile: result
        });
    })
}