const express = require('express');

const authenticationController = require('./../Controller/authenticationController');
const transactionController = require('./../Controller/transactionController');

const router = express.Router();

router.post('/recordTransaction',authenticationController.protect,transactionController.recordTrasanction);
router.get('/getTransactions', authenticationController.protect, transactionController.getTransactions);

module.exports = router;