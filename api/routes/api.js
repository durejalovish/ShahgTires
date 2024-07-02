/*
 * Api.js
 * @description
 * This file is used for storing all the routes related to the project.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const middleware = require("../middlewares/jwt");
const TireController = require('../controllers/TireController');
const RimsController = require('../controllers/RimsController');
const BrandController = require('../controllers/BrandController');
const InvoicedUserController = require('../controllers/InvoicedUserController');

const User = require('../models/UserModels');


router.get('/ping', userController.sayHello)
router.get('/fetchDataFromApi', userController.fetchDataFromApi);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userListing',middleware, userController.fetchAllUsers);
router.post('/deactivateUser', userController.deactivateUser);
router.post('/activateUser', userController.activateUser);
// router.post('/updateRecord', userController.updateRecord);

// Tires Api

router.post('/addTires', TireController.addTire);
router.post('/updateTires', TireController.updateTires );
router.get('/getAllTires', TireController.getAllTires);
router.post('/deleteTires', TireController.deleteTires)


router.post('/addRims', RimsController.addRims);
router.post('/updateRims', RimsController.updateRims );
router.get('/getAllRims', RimsController.getAllRims);
router.post('/deleteRims', RimsController.deleteRims);

//company
router.post('/addBrand', BrandController.addBrand);
router.get('/getAllBrands', BrandController.getAllBrands);
router.post('/updateBrand', BrandController.updateBrand );
router.post('/deleteBrand', BrandController.deleteBrand);

// Users Section
router.post('/addNewInvoice', InvoicedUserController.addInvoicedUser);
router.get('/getInvoicedUser', InvoicedUserController.getInvoicedUsers);
router.get('/getInvoiceNumber', InvoicedUserController.getLatestInvoice);
router.post('/getDataByFilter', InvoicedUserController.getData);

module.exports = router;