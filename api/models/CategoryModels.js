var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
	name: {type: String, required: true},
    description: {type: String, required: false},
	status: {type: Number, required: true, default: 1}, // 1 means active, 2 means deactive
	date: {type: Date, default:Date.now},
}, {timestamps: true});

CategorySchema.index(
    { name: 1,},
    { unique: true }
  );

module.exports = mongoose.model("Category", CategorySchema);