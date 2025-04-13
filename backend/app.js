const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// oAxAas2d1pvdRVdX
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

app.post("/api/posts", (req, res, next)=> {
    const post = Post({title: req.body.title, content: req.body.content}); //Automatically generates id object for this record
    post.save() //Does all automation, creates url, and saves the entry in the database. NOTE: collection name is always in plural form
    .then(result => {
        res.status(201).json({message: "post added successfully", postId: result._id});
    }); 
});

app.get("/api/posts",(req, res, next) => {

    // const posts = [
    //     {id: "gdafdsa23243", title: "first server side post title", content: "first server side content"},
    //     {id: "gdafdsa23243", title: "second server side post title", content: "second server side content"},
    // ];
    Post.find().then((documents => {
        res.status(200).json({
            message: "post fetched successfully",
            posts: documents
        });
    }));
});

app.delete("/api/posts/:id", (req, res, next)=>{
    Post.deleteOne({_id: req.params.id})
    .then((response)=>{
        console.log(response);
        res.status(200).json({message: "post deleted!"});
    });
});

app.use((req, res, next)=>{
    console.log('Hey from second middleware');
    res.send('Hi from express!');
});

module.exports = app;