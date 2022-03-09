const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var indexRouter = require('./routes/index');

///////
//APP//
///////
var swig = require('swig');
var cons = require('consolidate');

const dir = path.join(__dirname, 'public');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cookieParser());
//app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter);



app.use(express.static(dir));


// view engine setup
app.engine('html', cons.swig)
app.engine('pug', require('pug').__express )
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view engine', 'pug');

app.listen(3003, () => console.log('Listening on http://localhost:3003/'));




module.exports = app;
