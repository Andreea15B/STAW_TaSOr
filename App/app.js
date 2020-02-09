const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
var livereload = require('connect-livereload');
var https = require('https');
var fs = require('fs');
var webpush = require('web-push');


port = process.env.PORT || 3000;

app.use(session({
    secret: 'I love cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 8 * 60 * 60 * 10000 }
}));

// app.use(livereload())

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
app.use('/image', require('./routes/image'));

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

const privateVapidKey = 'Lx7976zuR_kLWm7XVgPXoaX3WOZ1yBdGkObNS7iFeUk';
const publicVapidKey = 'BGrZ_Y60uwSrh-Zrf_FjIBfw5kvB2ziYs6i5pgKY5iw8E601jdeePi6QHByuXB94YbLf4MxHPCS7_o_j7TtknU0';

webpush.setVapidDetails('mailto:tasor.acc@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {

    const subscription = req.body;

    res.json({});
    const payload = JSON.stringify({ title: 'Push Test' });

    webpush.sendNotification(subscription, payload).catch(err => console.error())

})

https.createServer({
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.cert')
    }, app)
    .listen(port, function() {
        console.log('App listening on port 3000! Go to https://localhost:3000/')
    });