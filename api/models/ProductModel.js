var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
	name: {type: String, required: true},
	price:{type: Number, required: true, default: 0},
    category:{type: mongoose.Schema.ObjectId,
        ref: 'Category'},
	status: {type: Number, required: true, default: 1}, // 1 means active, 2 means deactive
	date: {type: Date, default:Date.now},
}, {timestamps: true});

ProductSchema.index(
    { name: 1, category: 1, price: 1, ratingsAverage: -1 },
    { unique: true }
  );

module.exports = mongoose.model("Product", ProductSchema);