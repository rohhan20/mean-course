const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post("", (req, res, next)=> {
    const post = new Post({title: req.body.title, content: req.body.content}); //Automatically generates id object for this record
    post.save() //Does all automation, creates url, and saves the entry in the database. NOTE: collection name is always in plural form
    .then(result => {
        res.status(201).json({message: "post added successfully", postId: result._id});
    }); 
});

router.get("",(req, res, next) => {

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

router.delete("/:id", (req, res, next)=>{
    Post.deleteOne({_id: req.params.id})
    .then((response)=>{
        console.log(response);
        res.status(200).json({message: "post deleted!"});
    });
});

router.patch("/:id", (req, res, next) => {
    const post = new Post({_id: req.body.id, content: req.body.content, title: req.body.title});
    Post.updateOne({_id: req.params.id}, post)
    .then((response)=>{
        console.log(response);
        res.status(200).json({message: "Post updated successfully!"})
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post not found"});
        }
    });
});

router.use((req, res, next)=>{
    console.log('Hey from second middleware');
    res.send('Hi from express!');
});

module.exports = router;

