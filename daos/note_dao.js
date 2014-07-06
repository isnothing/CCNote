var mysql = require('mysql');
var evnents = require('events');
var emitter = new events.EventEmitter();
var app = require('../app/js');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'ccnote'
});

var create = function(noteName, content) {
    var createNote = 'insert into ccnote(nid, content) values(' + noteName + ', ' + content + ');';
    connection.query(createNode, function(err, rows, fields)});
};

module.exports = create;
