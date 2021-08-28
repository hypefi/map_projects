const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

var indexRouter = require('./routes/index');



//db connect requirements 

var mongoose = require("mongoose");
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


///////
//APP//
///////


const dir = path.join(__dirname, 'public');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cookieParser());
//app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter);

app.use(function(req, res, next){
next(createError(404));
});

//error handler
//
//
/*app.use(function(err, req, res, next){
//set locals, only providing error in development environment
//
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page 
res.status(err.status || 500);
res.render('error'); //uncomment if you use a view engine 

});*/


app.post('/geojson', (req, res) => {
  // you have address available in req.body:
  console.log(req.body);
  console.log(req.body.geometry.coordinates);
  //send to DB 
  //
  //
  // always send a response:
  res.json({ ok: true });
});

app.use(express.static(dir));

app.listen(3003, () => console.log('Listening on http://localhost:3003/'));

module.exports = app;
