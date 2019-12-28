const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

port = process.env.PORT || 3000;

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/users'); //importing route
routes(app); //register the route