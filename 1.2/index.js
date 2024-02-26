// 1. SETUP
const express = require('express'); // importing express
const app = express(); // create a new express application

// 2. ROUTES
app.get('/', function(req, res){
    res.send("Hello");
})

// 3. STARTING THE SERVER
app.listen(3000, function(){
    console.log("Server has started")
})