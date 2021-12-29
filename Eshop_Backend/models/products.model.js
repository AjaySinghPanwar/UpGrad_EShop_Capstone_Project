const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: {
        pid: String
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    availableItems: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);