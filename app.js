const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');


const app = express();

const userRouter = require('./Router/userRoutes');
const transactionRouter = require('./Router/transactionRoutes');
//GLOBAL MIDDLEWARES


//Set environment to development
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Body parser
app.use(express.json({ limit: "10kb" }));

//cookie parser
app.use(cookieParser());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// Testing middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware!");

  next();
});

//Mounting our new routers to app on a specified route
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transaction', transactionRouter);


module.exports = app;
