const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://max:oAxAas2d1pvdRVdX@cluster0.ikhdkbl.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{console.log("Connected to the database!")})
    .catch(()=>{console.log("Connection Failed!")});

app.use(
    (req, res, next)=>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS")

        next();
    }
);
app.use("/api/posts", postsRoute);

module.exports = app;