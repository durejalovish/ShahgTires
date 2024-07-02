var mongoose = require("mongoose");

var BrandSchema = new mongoose.Schema({
	brandName: {type: String, required: true},
    description: {type:String, required: false},
	date: {type: Date, default:Date.now},
}, {timestamps: true});


module.exports = mongoose.model("Brand", BrandSchema);