/*
 * Invoiced User Controller
 * @description
 * The Tire controller is used for handling all the functions related to the tires.
 */

var crypto = require('crypto');
const InvoicedUsersSchema = require('../models/InvoiceUsersModels');

const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const { addTire, updateTire } = require('../validations/validation');
const moment = require('moment');

// function for adding the tires

exports.addInvoicedUser = async function (req, res) {
    try {   
        const { 
            customerName, address, phoneNumber, productListing, additionalMessage, vehicleVIN, totalOTS, totalAmount, invoiceNumber, invoiceType} = req.body;
        // Create body
        const invoicedUsersObject = new InvoicedUsersSchema({
            customerName, address, phoneNumber, productListing, additionalMessage, vehicleVIN, totalOTS, totalAmount, invoiceNumber, invoiceType, date: Date.now()
        });
        const savedData =  await invoicedUsersObject.save()
        
        return successResponse(res, Messages.say('Invoice has been added Successfully'), savedData);
    } catch (error) {
        console.log(error)
        return errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.getInvoicedUsers = async function (req, res) {
    try {
        const getAllUsers  = await InvoicedUsersSchema.find().sort({_id: -1});
        successResponse(res,Messages.say('Records are fetched'), getAllUsers);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.getLatestInvoice = async function (req, res) {
    try {
        console.log("req.body._id", req.body.id);
        const data = await InvoicedUsersSchema.find({}).sort({_id:-1}).limit(1);
        successResponse(res,Messages.say('Records are fetched'), data);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.getData = async function (req, res) {
    try {
        const startDate = moment().startOf(req.body.filterType);
        const endDate = moment().endOf(req.body.filterType);
        const data = await InvoicedUsersSchema.find({
            date: {
              $gte: startDate.toDate(),
              $lte: endDate.toDate()
            }
          });
        successResponse(res,Messages.say('Records are fetched'), data);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}