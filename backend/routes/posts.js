const express = require('express');
const Post = require('../models/post');
const multer = require('multer');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid) {
            error = null
        }
        cb(error, "backend/images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        // const ext = MIME_TYPE_MAP[file.mimetype]
        // cb(null, name + '-' + Date.now() + '.' + ext);
        cb(null, name);
    }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next)=> {
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({title: req.body.title, content: req.body.content, imagePath: url + "/images/" + req.file.filename}); //Automatically generates id object for this record
    post.save() //Does all automation, creates url, and saves the entry in the database. NOTE: collection name is always in plural form
    .then(createdPost => {
        res.status(201).json({message: "post added successfully", post: {
            ...createdPost,
            id: createdPost._id
        }});
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

