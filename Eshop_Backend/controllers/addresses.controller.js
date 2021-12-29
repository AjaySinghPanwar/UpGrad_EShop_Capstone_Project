const db = require("../models");
const Address = db.addresses;

// Create and Save a user
exports.addAddress = (req, res) => {
    const zipCode = req.body.zipCode;
    const contactNumber = req.body.contactNumber;
    
    //Regular expression for phoneNumber
    let contactNumberRegex = new RegExp('^[0-9]{10}$');
    if (typeof(contactNumber) === "string" || !contactNumberRegex.test(contactNumber)) {
        res.status(401).send("Invalid contact Number!");
        return;
    }

    //Regular expresssion for zip code
    let zipCodeRegex = new RegExp('^[0-9]{6}$')
    if (typeof (zipCode) === "string" || !zipCodeRegex.test(zipCode)) {
        res.status(401).send("Invalid zip code!");
        return;
    }



    // Create a new address
    const address = new Address({
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        street: req.body.street,
        landmark: req.body.landmark ? req.body.landmark : "",
        city: req.body.state,
        state: req.body.state,
        zipCode: req.body.zipCode
    });

    // Save Address in the database
    address
        .save(address)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Address error occurred, please try again later."
            });
        });

};