const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.addresses = require("./addresses.model")(mongoose);
db.users = require("./users.model")(mongoose);
db.orders = require("./orders.model")(mongoose);
db.products = require("./products.model")(mongoose);

module.exports = db;