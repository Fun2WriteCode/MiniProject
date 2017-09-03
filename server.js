var path = require('path');
var express = require('express');
var cors = require('cors');
var passport = require('passport');

var app=express();
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, cid, user-id, x-auth, Cache-Control, X-Requested-With, *');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    };
});

app.use(express.static(__dirname + '/public'));

//app.use(express.static(__dirname + '/controllers'));             
app.use(require("./controllers/userCtr.js"));
app.use(require("./controllers/all.js"));



app.use(cors()); //authentication if routes does not send correct tocken along

//passportjs middleware
app.use(passport.initialize());
app.use(passport.session());


//adding passport file in here
require('./config/passport')(passport);

//ORM Configurations
var waterlineConfig = require('./config/connections')
, waterlineOrm = require('./config/init').waterlineOrm;
var modelPath = path.join(__dirname, '/models');
require('./config/init')(modelPath);

//ORM Initialization 
waterlineOrm.initialize(waterlineConfig, function (err, models) {
    if (err) throw err;

    db = function (table) { return models['collections'][table]; };
    db.collections = models.collections;
    db.connections = models.connections;

    app.listen(3000);
	console.log("server is live at port 3000");
});