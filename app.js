var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var handler = require('./models/RequestHandler');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var session = require('express-session');
var sharedNoteDao = require('./daos/shared_dao.js');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ username: null, saveUninitialized: true, secret: 'keyboard cat', resave: true, cookie: { maxAge: 60000 }}));
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.username) {
        return res.redirect("/login");
    }
    console.log(url);
    next();
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

io.on('connection', function(socket) {

    socket.emit('result', {hello: 'world'});

    socket.on('add', function(data) {
        handler.handleAdd(data, function(_nid) {
           if (_nid != -1) {
               socket.emit('add-finished', {nid: _nid});
           } else {
               socket.emit('add-finished',{});
           }
        });
    });

    socket.on('update',function(data) {
        handler.handleUpdate(data, function(success) { 
           if (success == 0) {
               socket.emit('update-successful', {});
           } else {
               socket.emit('update-failed',{});
           }
        });
    });

    socket.on('delete',function(data) {
        console.log(data);
        var nid = data.nid;
        handler.handleDelete(nid, function(success) { 
           if (success == 0) {
               socket.emit('delete-successful', {});
           } else {
               socket.emit('delete-failed',{});
           }
        });
    });

    socket.on('show', function(data) {
        var note = {id:data.nid, name: '', content: ''};
        handler.handleShow(note, function(note) {
            socket.emit('show-successful', {"note": note});
        });
    });

    socket.on('shareNote', function(data) {
      var nid = data.nid;
      var username = data.username;
      sharedNoteDao.create(nid, username, function() {
            socket.emit('shareNote-successful', {});
      });
    })

});

server.listen(3000);