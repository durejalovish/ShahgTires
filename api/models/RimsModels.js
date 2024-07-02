const { number } = require("joi");
var mongoose = require("mongoose");

var RimsSchema = new mongoose.Schema({
    brandName:{type: String, required: false},
	size: {type: String, required: true},
    pattern: {type:String, required: true},
    price: {type:Number, required: true},
    quantity:{type: Number, false: false},
	date: {type: Date, default:Date.now},
}, {timestamps: true});


module.exports = mongoose.model("Rims", RimsSchema);