var mysql = require('mysql');
var events = require('events');
var emitter = new events.EventEmitter();
//var app = require('../app/js');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'ccnote'
});

var create = function(noteName, content) {
    var createNote = 'insert into note(name, content) values(?, ?)';
    connection.query(createNote, ['noteI','content'],function(err, rows, fields){
        if (err == null) {
            console.log('error! please try again.');
        } else {
            console.log('create successful');
        }
    });
};

module.exports = create;
