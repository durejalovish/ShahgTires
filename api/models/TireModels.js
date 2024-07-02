const { number } = require("joi");
var mongoose = require("mongoose");

var TireSchema = new mongoose.Schema({
	size: {type: String, required: true},
    pattern: {type:String, required: true},
    price: {type:Number, required: true},
    quantity:{type: Number, required: false},
    brandName: {type:String, required: true},
	date: {type: Date, default:Date.now},
}, {timestamps: true});


module.exports = mongoose.model("Tire", TireSchema);