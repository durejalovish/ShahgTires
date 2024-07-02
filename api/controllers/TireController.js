/*
 * Tire Controller
 * @description
 * The Tire controller is used for handling all the functions related to the tires.
 */

var crypto = require('crypto');
const TireSchema = require('../models/TireModels');

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

exports.addTire = async function (req, res) {
    try {   
        console.log(req.body);
        const { error } = addTire(req.body);
        if(error){
            return errorResponse(res, httpCodes.badReq, error[0].message);
        }
        const getTires =  await TireSchema.find({size: req.body.size, pattern: req.body.pattern, brandName: req.body.brandName });

        console.log("getTires", getTires);
        if(getTires.length > 0){
            return errorResponse(res, httpCodes.badReq, "These type of tires already exists.");
        }
        const {size, pattern, price, quantity, brandName  } = req.body;
        // Create body
        const addTireObject = new TireSchema({
            size,  pattern, price,  quantity, brandName ,date: Date.now()
        });
        const savedData =  await addTireObject.save()
        
        return successResponse(res, Messages.say('Tires has been added Succesfully'), savedData);
    } catch (error) {
        console.log(error)
        return errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.updateTires = async function (req, res) {
    try {
        // const { error } = updateTire(req.body);
        // if(error){
        //     return errorResponse(res, httpCodes.badReq, errordetails[0].message);
        // }
        console.log(req);
        const updateTire = await TireSchema.findByIdAndUpdate({_id: req.body._id}, {
           size : req.body.size, 
           pattern: req.body.pattern,
           price: req.body.price,
           quantity: req.body.quantity ,
           brandName: req.body.brandName,
           date: Date.now()
        });
        
        const savedTires = await updateTire.save();
       
        return successResponse(res, Messages.say('Tires has been added Succesfully'), savedTires);
    } catch (error) {
        console.log(error)
        return errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.getAllTires = async function (req, res) {
    try {
        const getAllTires  = await TireSchema.find().sort({_id: -1});
        successResponse(res,Messages.say('Records are fetched'), getAllTires);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.deleteTires = async function (req, res) {
    try {
        console.log("req.body._id", req.body.id);
        const tires  = await TireSchema.deleteOne({_id: req.body.id});
        successResponse(res,Messages.say('Tires are deleted'), tires);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}