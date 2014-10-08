var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var handler = require('./models/RequestHandler');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
        console.log('add note ' + data.title);
        handler.handleAdd(data, function(success) {
           if (success == 0) {
               socket.emit('add-finished', {result: 'success'});
           } else {
               socket.emit('add-finished',{});
           }
        });
    });

    socket.on('update',function(data) {
        console.log('update note');
        handler.handleUpdate(data, function(success) { 
           if (success == 0) {
               socket.emit('update-finished', {result: 'success'});
           } else {
               socket.emit('update-finished',{result: 'fail'});
           }
        });
    });

    socket.on('delete',function(data) {
        console.log('delete note');
        handler.handleDelete(data, function(success) { 
           if (success == 0) {
               socket.emit('delete-successful', {});
           } else {
               socket.emit('delete-failed',{});
           }
        });
    });

    socket.on('show', function(data) {
        console.log('showw note');
        handler.handleShow(data, function(success) { 
           if (success == 0) {
               socket.emit('show-successful', {});
           } else {
               socket.emit('show-failed',{});
           }
        });
    });

});

server.listen(3000);
