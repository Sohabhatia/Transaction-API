const Transactions = require('./../Model/transactionModel');
const User = require('./../Model/userModel');

exports.recordTrasanction = async (req, res, next) => {
    
    console.log("current user => ", req.user);
    console.log("trasanction => ", req.body);
    const newTransaction = await Transactions.create({
         Amount: req.body.Amount,
         TransactionType: req.body.TransactionType,
         PartyName: req.body.PartyName,
         user: req.user._id
       });
     res.status(200).json({
       status: "success",
       requestTime: req.requestTime,
     });
    
  };


exports.getTransactions = async (req, res, next) => {

 console.log("current user => ", req.user);

 const userTransactions = await Transactions.find( {"user" : { $all : [req.user._id]}});
 res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data : {
        userTransactions
    }
  });


}