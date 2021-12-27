const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id: {
        oid: String
    },
    address: {
        sid: String
    },
    productId: {
        pid: String
    },
    userId: {
        uid: String
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
})

module.exports = Order = mongoose.model('order', OrderSchema);