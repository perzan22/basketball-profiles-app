const profile = require('../models/profile')
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

exports.getProfile = (req, res, next) => {
    profileID = req.params.id;
    Profile.findById(profileID).then(profile => {
        if (profile) {
            res.status(200).json(profile)
        } else {
            res.status(404).json('Profile not found!')
        }
    })
}

exports.editProfile = (req, res, next) => {
    const profile = new Profile({
        _id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        height: req.body.height,
        weight: req.body.weight,
        position: req.body.position,
        description: req.body.description,
        creator: req.userData.userID
    });

    Profile.updateOne({_id: req.body.id, creator: req.userData.userID}, profile).then(result => {
        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Profile updated successfully!' })
        } else {
            res.status(401).json({ message: 'Not authorized' })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Couldnt update a post'
        })
    });
}