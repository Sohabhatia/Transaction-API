const User = require('./../Model/userModel');
const jwt = require('jsonwebtoken');




const tokenSign = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user, statusCode, res) => {
  const token = tokenSign(user._id);

  //Remove password from the output
  user.password = undefined;

  //Putting the token on the cookie
  res.cookie('JWT', token, {
    expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly : true
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.registration = async (req, res, next) => {
  
  const newUser = await User.create({
    Name: req.body.Name,
    userName: req.body.userName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });
  
  sendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
    
  const {username, password } = req.body;
  
  // Check if the username and password exists
  if (!username || !password) {
    console.log('username and password not provided')
  }

  // Check if the user exist and password is correct
   const user = await User.findOne({ username: username}).select('+password');

  if (!user || !(await user.correctPassword(user.password, password))) {
    console.log('incorrect password')
  }
  
  sendToken(user, 200, res);
};


exports.protect = async ( req, res, next) => {
  
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.JWT) {
      token = req.cookies.JWT;
    }
    if (!token) {
      res.status(200).render('login', {
        Title: 'Log into your account',
      });
      
    }
  
    //verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    
    
    //Check if the user still exists
    let currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      console.log('User does not exist');
    }
  
    //GRANT ACCESS TO PROTECTED ROUTE
    console.log(currentUser);
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
}
  


