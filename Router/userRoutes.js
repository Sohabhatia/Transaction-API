const express = require('express');
const authenticationController = require('./../Controller/authenticationController');



const router = express.Router();

router.post('/registration', authenticationController.registration);
router.post('/login', authenticationController.login);


module.exports = router;
