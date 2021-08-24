const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');


const dir = path.join(__dirname, 'public');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/geojson', (req, res) => {
  // you have address available in req.body:
  
  console.log(req.body.address);
  
  // always send a response:
  res.json({ ok: true });
});

app.use(express.static(dir));

app.listen(3003, () => console.log('Listening on http://localhost:3003/'));
