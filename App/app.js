const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
var livereload = require("connect-livereload");

port = process.env.PORT || 3000;

app.use(session({
    secret: 'I love cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 8 * 60 * 60 * 1000 }
}));

app.use(livereload())

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/home', require('./routes/home'));
app.use('/board', require('./routes/board'));

app.listen(port);


var routes = require('./routes/users'); //importing route
routes(app); //register the route