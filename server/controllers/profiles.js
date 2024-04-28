const Profile = require('../models/profile')

exports.createProfile = (req, res, next) => {
    console.log(req.body)
    const profile = new Profile({
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        height: req.body.height,
        weight: req.body.weight,
        position: req.body.position,
        /*strength1: req.body.strength1,
        strength2: req.body.strength2,
        strength3: req.body.strength3,*/
        description: req.body.description,
        creator: req.userData.userID
    })


    profile.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Profile added successfully',
            profile: {
                ...result,
                id: result._id
            }
        });
    })
}

exports.getProfiles = (req, res, next) => {
    Profile.find().then(documents =>
        res.status(200).json({
            message: 'Profiles fetched succesfully!',
            profiles: documents
        })
    );

}

exports.deleteProfile = (req, res, next) => {
    Profile.deleteOne({_id: req.params.id}).then(result => {
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Deleted successfully' })
        } else {
            res.status(401).json({ message: 'Delete not successfully' })
        }
    })
}