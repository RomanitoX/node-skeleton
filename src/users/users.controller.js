const User = require("./users.model"),
    argon2 = require("argon2"),
    jwt = require('jsonwebtoken'),
    {jwt_token, jwt_timeout} = require('../../config/config');

exports.create = async (req, res) => {

    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).send({
            message: "Required field can not be empty",
            obj: req.body
        });
    }


    const user = new User({
        email: req.body.email,
        password: await argon2.hash(req.body.password),
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        isActive: req.body.isActive,
        userType: req.body.userType,
    });

    user.save()
        .then((data) => {
            res.send(data);
            console.log("creation OK")
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User.",
            });
        });
};

exports.findAll = (req, res) => {
    User.find()
        .sort({name: -1})
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error Occured",
            });
        });
};

exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id,
                });
            }
            res.status(200).send(user);
            console.log(user);
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id,
            });
        });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found ",
                });
            }
            res.send({message: "User deleted successfully!"});
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete user ",
            });
        });
};

exports.UpdateUser = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        res.status(400).send({
            message: "required fields cannot be empty",
        });
    }
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "no user found",
                });
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "error while updating the post",
            });
        });
};

exports.login = (req, res) => {
    User.findOne({email: req.body.email}).select('password').then
    ((user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            try {
                console.log(user);
                argon2.verify(user.password, req.body.password).then(match => {
                    if (match) {
                        const token = jwt.sign(
                            {userId: user._id},
                            jwt_token,
                            {expiresIn: jwt_timeout});
                        res.status(200).json({
                            userId: user._id,
                            token: token
                        });
                    } else {
                        res.status(401).send({"match": match});
                    }
                });
            } catch (err) {
                res.status(500).send({"error :": err});
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
}

exports.logout = (req, res) => {

}