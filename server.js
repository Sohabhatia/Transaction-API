const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config({ path: "./config.env" });
const app = require("./app.js");

//set by node.js, express automatically sets env to development
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful DB connection!");
  });

//START SERVER

const server = app.listen(3001, () => {
  console.log(`App running on port 3001...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
