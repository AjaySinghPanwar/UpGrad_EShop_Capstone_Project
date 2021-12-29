const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = db.users;

// Create and Save a user
exports.signUp = (req, res) => {
    // Validate request
    if (!req.body.email && !req.body.password) {
        res.status(400).send({ message: "Please provide email and password to continue." });
        return;
    }

    const email = req.body.email;
    const contactNumber = req.body.contactNumber;


    //Regular expression for email
    let emailRegex = new RegExp('[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.+[a-z]{2,6}');
    if (!emailRegex.test(email)) {
        res.status(401).send("Invalid email-id format!");
        return;
    }

    //Regular expression for contactNumber
    let contactNumberRegex = new RegExp('^[0-9]{10}$');
    if (typeof(contactNumber) === "string" || !contactNumberRegex.test(contactNumber)) {
        res.status(401).send("Invalid contact Number!");
        return;
    }

    //Checking if user is trying to enter admin email id
    if (email === 'admin@upgrad.com') {
        res.status(400).send({ message: "Sorry, You cannot register as ADMIN." });
        return;
    }

    const filter = { email: email };

    //Find user based on the email provided in API req 
    User.findOne(filter, (err, user) => {

        if (err || user === null) {//If not found
            // Create a User
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: email,
                password: req.body.password,
                contactNumber: contactNumber,
                role: req.body.role ? req.body.role : 'user',
                isLoggedIn: true,
            });

            // Save User in the database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(data => {
                            const token = jwt.sign({ _id: data._id }, 'myprivatekey');
                            data.token = token;
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred, please try again later."
                            });
                        });
                })
            })
        }
        else {//User found with same email
            res.status(400).send({
                message: "Try any other email, this email is already registered!"
            });
        }

    });

};

// Retrieve user using the email provided in the req parameter.
// Validate user by matching the password provided in the req parameter.
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate request
    if (!email && !password) {
        res.status(400).send({ message: "Please provide email and password to continue." });
        return;
    }

    const filter = { email: email };
    User.findOne(filter, (err, user) => {

        if (err || user === null) {
            res.status(401).send({
                //better message wrt security. Prevents brute force attacks
                message: "Email or password not correct."
            });
        } else {
            if (bcrypt.compare(password, user.password)) {
                user.isLoggedIn = true;

                User.findOneAndUpdate(filter, user, { useFindAndModify: false })
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: "This email has not been registered!"
                            });
                        } else {
                            const token = jwt.sign({ _id: data._id }, 'myprivatekey');
                            data.token = token;
                            res.send(data);
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating."
                        });
                    });

            } else {
                res.status(401).send({
                    message: "Invalid Credentials!"
                });
            }
        }

    });

};

// Update isLoggedIn parameter of a User.
exports.logout = (req, res) => {

    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Please provide user Id." });
        return;
    }

    const id = req.body.id;
    const update = { isLoggedIn: false };

    User.findByIdAndUpdate(id, update)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Some error occurred, please try again later."
                });
            } else res.send({ message: "Logged Out successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating."
            });
        });
};