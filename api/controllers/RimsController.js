/*
 * Tire Controller
 * @description
 * The Tire controller is used for handling all the functions related to the tires.
 */

var crypto = require('crypto');
const RimSchema = require('../models/RimsModels');

const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
const dbQueryObj = require('../../db/query');
const mongoDbObject = require("../../db/db");
const bcrypt = require('bcryptjs')
const { addTire, updateTire } = require('../validations/validation');
// function for adding the tires

exports.addRims = async function (req, res) {
    try {
        // const { error } = addTire(req.body);
        // if(error){
        //     return errorResponse(res, httpCodes.badReq, errordetails[0].message);
        // }
        const {brandName, size, pattern, price, quantity  } = req.body;
        // Create body
        const addRimsObject = new RimSchema({
            brandName, size,  pattern, price,  quantity ,date: Date.now()
        });
        const savedData =  await addRimsObject.save()
        
        return successResponse(res, Messages.say('Tires has been added Succesfully'), savedData);
    } catch (error) {
        console.log(error)
        return errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.updateRims = async function (req, res) {
    try {
        // const { error } = updateTire(req.body);
        // if(error){
        //     return errorResponse(res, httpCodes.badReq, errordetails[0].message);
        // }
        
        const updateRims = await RimSchema.findByIdAndUpdate({_id: req.body._id}, {
           brandName: req.body.brandName,
           size : req.body.size, 
           pattern: req.body.pattern,
           price: req.body.price,
           quantity: req.body.quantity,
           date: Date.now()
        });
        
        const savedRims = await updateRims.save();
       
        return successResponse(res, Messages.say('Rims has been updated Succesfully'), savedRims);
    } catch (error) {
        console.log(error)
        return errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.getAllRims = async function (req, res) {
    try {
        const getAllRims  = await RimSchema.find().sort({_id: -1});
        successResponse(res,Messages.say('Records are fetched'), getAllRims);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.deleteRims = async function (req, res) {
    try {
        console.log("req.body._id", req.body.id);
        const rims  = await RimSchema.deleteOne({_id: req.body.id});
        successResponse(res,Messages.say('Rims are deleted'), rims);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}