const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Hey, from the firstmiddle ware');
    next();
})

app.use((req, res, next)=>{
    console.log('Hey from second middleware');
    res.send('Hi from express!');
});

module.exports = app;