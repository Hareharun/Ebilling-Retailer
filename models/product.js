var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    name: String,
    stock: Number,
    price: Number,
});

module.exports = mongoose.model("Product", ProductSchema);