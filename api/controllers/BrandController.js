/*
 * Tire Controller
 * @description
 * The Tire controller is used for handling all the functions related to the tires.
 */

var crypto = require('crypto');
const BrandSchema = require('../models/BrandModel');

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
const { addBrand } = require('../validations/validation');
// function for adding the tires

exports.addBrand = async function (req, res) {
    try {
        console.log(req.body);
        const { error } = addBrand(req.body);
        if(error){
            console.log(error);
            return errorResponse(res, httpCodes.badReq, error[0].message);
        }
        const {brandName, description  } = req.body;
        // Create body
        const addBrandObject = new BrandSchema({
            brandName, description ,date: Date.now()
        });
        const savedData =  await addBrandObject.save()
        
        return successResponse(res, Messages.say('Brand has been added Successfully'), savedData);
    } catch (error) {
        console.log(error)
        return errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.updateBrand = async function (req, res) {
    try {
        // const { error } = updateTire(req.body);
        // if(error){
        //     return errorResponse(res, httpCodes.badReq, errordetails[0].message);
        // }
        console.log(req.body);
        const updateBrand = await BrandSchema.findByIdAndUpdate({_id: req.body._id}, {
            brandName : req.body.brandName, 
           description: req.body.description,
           date: Date.now()
        });
        
        const savedBrands = await updateBrand.save();
       
        return successResponse(res, Messages.say('Brand has been updated Successfully'), savedBrands);
    } catch (error) {
        console.log(error)
        return errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.getAllBrands = async function (req, res) {
    try {
        const getAllBrands  = await BrandSchema.find().sort({_id: -1});
        successResponse(res,Messages.say('Records are fetched'), getAllBrands);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.deleteBrand = async function (req, res) {
    try {
        console.log("req.body._id", req.body.id);
        const tires  = await BrandSchema.deleteOne({_id: req.body.id});
        successResponse(res,Messages.say('Rims are deleted'), tires);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}