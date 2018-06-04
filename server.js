const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp/:time_stamp", function(req, res) {
  let date = (req.params.time_stamp) ? new Date(req.params.time_stamp) : new Date();
  if (date.toString() === 'Invalid Date' && Date.parse(parseInt(req.params.time_stamp)) !== NaN) {
    date = new Date(parseInt(req.params.time_stamp));
  } else if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
    return res.end();
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  })
  return res.end();
})

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
