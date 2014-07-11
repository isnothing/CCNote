var mysql = require('mysql');
var events = require('events');
var app = require('../app.js');
var emitter = new events.EventEmitter();
//var app = require('../app/js');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'ccnote'
});

var dao = {
    create : function(noteName, content) {
        var createSql = 'insert into note(name, content) values(?, ?)';
        connection.query(createSql, ['noteI','content'],function(err, rows, fields){
            if (err != null) {
                console.log('error! please try again.');
            } else {
                console.log('create successful');
            }
        });
    },
    show : function(socket) {
        var showSql = 'select nid, name, content from note';
        connection.query(showSql, function(err, rows, fields) {
            for (var i=0; i < rows.length; i++) {
                console.log('data : ' + rows[i].nid + ' ' + rows[i].name + ' ' + rows[i].content);
            }
            app.send(rows, socket);
        });
    }
}

module.exports = dao;
