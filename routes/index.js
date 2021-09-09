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
    type: String,
    properties: mongoose.Schema.Types.Mixed,
    geometry: mongoose.Schema.Types.Mixed
});

// Mongoose Model definition
var Json = mongoose.model('JString', JsonSchema, 'layercollection');



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html', { title: 'Express' });
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
        res.render('map.pug', {
            "jmap" : docs,
            lat : 40.78854,
            lng : -73.96374
        });
    });
});


router.post('/geojson', (req, res) => {
// you have address available in req.body:
  console.log(req.body);
  console.log(req.body.geometry.coordinates);
  //Send to DB
  console.log(req.body.geometry.type);

  var park = new Json();
  park.type = req.body.type;
  park.properties = req.body.properties;
  park.geometry = req.body.geometry;

console.log(park);
  park.save( function(err, docs){
  //Json.create({name: req.body.type, properties: req.body.properties, geometry: req.body.geometry.type }, function(err, docs){
 // console.log("park created");
  if (err) return handleError(err);
  }); 

  //Always send a response:
  res.json({ ok: true });
});



module.exports = router;
