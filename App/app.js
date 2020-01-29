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
app.use('/logout', require('./routes/logout'));
app.use('/task', require('./routes/task'));
app.use('/user-settings', require('./routes/user-settings'));
app.listen(port);


// for API
var routes = require('./api/users');
routes(app);
var routes_boards = require('./api/boards');
routes_boards(app);
var routes_tasks = require('./api/tasks');
routes_tasks(app);
var routes_members = require('./api/board_members');
routes_members(app);
var routes_images = require('./api/images');
routes_images(app);
var routes_history = require('./api/history');
routes_history(app);
var routes_taskUsers = require('./api/task_users');
routes_taskUsers(app);