// Routes/index.js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//db connect requirements

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/map", { useNewUrlParser: true }, function (error) {
    if (error) {
        console.log(error);
    }
});

var JsonSchema = new mongoose.Schema({
    name: String,
    type: mongoose.Schema.Types.Mixed
});

// Mongoose Model definition
var Json = mongoose.model('JString', JsonSchema, 'layercollection');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


/* GET json data. */
router.get('/mapjson/:name', function (req, res) {
    if (req.params.name) {
        Json.findOne({ name: req.params.name },{}, function (err, docs) {
            res.json(docs);
        });
    }
});

// routes/index.js
/* GET layers json data. */
router.get('/maplayers', function (req, res) {
    Json.find({},{'name': 1}, function (err, docs) {
        res.json(docs);
    });
});

/* GET Map page. */
router.get('/map', function(req,res) {
    Json.find({},{}, function(e,docs){
        res.render('map', {
            "jmap" : docs,
            lat : 40.78854,
            lng : -73.96374
        });
    });
});

module.exports = router;
