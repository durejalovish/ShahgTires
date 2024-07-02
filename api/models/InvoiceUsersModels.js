var mongoose = require("mongoose");

var InvoicedUsersSchema = new mongoose.Schema({
    customerName: {type: String, required: false},
    address:{type: String, required: false},
    phoneNumber: {type: Number, required: false},
    productListing: {
        items:{
            tires:[{
            brandName : {type: String, required: false},
            date: {type: Date, required: false},
            number_of_items: {type: String, required: false},
            pattern: {type: String, required: false},
            price: {type: String, required: false},
            quantity: {type: String, required: false},
            size: {type: String, required: false},
        }],
        rims:[{
            brandName : {type: String, required: false},
            date: {type: Date, required: false},
            number_of_items: {type: String, required: false},
            pattern: {type: String, required: false},
            price: {type: String, required: false},
            quantity: {type: String, required: false},
            size: {type: String, required: false},
        }]
    }
    },
    additionalMessage:{type: String, required: false},
    vehicleVIN:{type: String, required: false},
    totalOTS: {type: Number, required: false},
    totalAmount: {type: Number, required: false},
    invoiceNumber: {type: Number, required: false},
    invoiceType: {type: String, required: false},
    date: {type: Date, default:Date.now},
}, {timestamps: true});


module.exports = mongoose.model("InvoicedUsersSchema", InvoicedUsersSchema);