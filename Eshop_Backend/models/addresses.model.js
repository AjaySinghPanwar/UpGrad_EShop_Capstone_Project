const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    _id: {
        sid: String
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    landmark: {
        type: String,
        default: ""
    },
    zipCode: {
        type: Number,
        required: true
    },
    user: {
        userId: String
    }
})

module.exports = Address = mongoose.model('address', AddressSchema);