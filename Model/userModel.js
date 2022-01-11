const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  
    Name: {
    type: String,
    required: [true, 'Please provide a name!'],
  },
   userName: {
    type: String,
    required: [true, 'Please provide an username!'],
    unique: true,
},
password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password confirmation wrong!',
    },
  },
});

//encrypting our password
 userSchema.pre('save', async function (next) {
    //ONLY ENCRYPT WHEN PASSWORD IS SAVED OR MODIFIED
  if (!this.isModified('password')) return next();

  //ENCRYPT PASSWORD OF CURRENT DOCUMENT
  this.password = await bcrypt.hash(this.password, 12);

  // DELETE PASSWORD FIELD FROM DATABASE
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  userPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre(/^find/,function (next) {
  this.populate({
    path: 'myMedicines',
  });
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
