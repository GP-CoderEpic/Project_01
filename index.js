require('dotenv').config()
const express = require("express");


const {logReqRes} = require('./middlewares');
const {connectMongoDb } = require("./connection");

const { type } = require('os');
const userRouter = require('./routes/user');
const app = express();
const Port = 8000;

connectMongoDb("mongodb://localhost:27017/youtube-app-1").then(() => console.log('MongoDb connected'));



app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(logReqRes('log.txt'));

app.use("/api/users", userRouter);

app.listen(process.env.PORT, ()=> console.log("Server Started"));