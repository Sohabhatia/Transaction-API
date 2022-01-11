const mongoose = require('mongoose');
const User = require('./userModel');


const transactionSchema = new mongoose.Schema(
  {
    
    Amount: {
      type: Number,
      required: [true, 'An amount for transaction is required'],
      
      
    },
    TransactionType: {
      type: String,
      enum: ['paid', 'recieved'],
    },
    PartyName: {
      type: String,
      required: [true, ' A party name is required for the transaction'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A transaction must belong to some user!'],
      },
    });


const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;