// 1. SETUP
const express = require('express'); 
const hbs = require('hbs');
const wax = require('wax-on');

const app = express(); // create an express application
app.set('view engine', 'hbs'); // set express to use hbs as our view engine

// setup wax on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable form processing
app.use(express.urlencoded({
    extended: false
}))

// 2. ROUTES
app.get('/', function(req,res){
    res.render('index')
})

app.get('/booking', function(req,res){
 
    res.render('booking')
})

app.post('/booking', function(req,res){
    res.send("Form recieved");

    let addOns = [];
    if (req.body.addOns) {
        if (Array.isArray(req.body.addOns)) {
            addOns = req.body.addOns;
        } else {
            addOns = [ req.body.addOns];
        }
    }
    console.log("selected addons =", addOns);

    // req is whatever the client sends to the server
    // and the form data will be in req.body
    console.log(req.body);
})

app.get('/delete-food/:foodid', function(req,res){
    const idToDelete = req.params.foodid;

    // linear search algo
    let wantedFoodRecord = null;
    for (let record of foodRecords) {
        if (record.id == idToDelete) {
            wantedFoodRecord = record;
            break;
        }
    }

    res.render('confirm-delete', {
        "record": wantedFoodRecord
    })
})

app.post('/delete-food/:foodid', function(req,res){
    // we need to know the index of the element
    // that we want to delete
    const idToDelete = req.params.foodid;

    // find the index of the food record
    let indexToDelete = -1;
    for (let i = 0; i < foodRecords.length; i++) {
        if (foodRecords[i].id == idToDelete) {
            indexToDelete = i;
            break;
        }
    }

    // use splice to delete an index from an array
    // splice has 2 parameters:
    // parameter 1: the index to start deleting from
    // parameter 2: how many to delete 
    foodRecords.splice(indexToDelete, 1);
    res.redirect('/');
})

// 3. START SERVER
app.listen(3004, function(){
    console.log("Server has started")
})