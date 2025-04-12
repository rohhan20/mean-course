const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
    (req, res, next)=>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS")

        next();
    }
);

app.post("/api/posts", (req, res, next)=> {
    const post = req.body;
    console.log(post);
    res.status(201).json({message: "post added successfully"});
});

app.get("/api/posts",(req, res, next) => {

    const posts = [
        {id: "gdafdsa23243", title: "first server side post title", content: "first server side content"},
        {id: "gdafdsa23243", title: "second server side post title", content: "second server side content"},
    ];

    res.status(200).json({message: "post fetched successfully", posts: posts});
})

app.use((req, res, next)=>{
    console.log('Hey from second middleware');
    res.send('Hi from express!');
});

module.exports = app;