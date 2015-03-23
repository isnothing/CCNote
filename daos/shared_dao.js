var mysql = require('mysql');
//var app = require('../app/js');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'ccnote'
});

var dao = {
    create : function(nid, username, callback) {
        console.log("create shared_note=>" + username + " " + nid);
        var createSql = 'insert into shared_note(username, nid) values(?, ?)';
        connection.query(createSql, [username,nid],function(err, rows, fields){
            if (err != null) {
                console.log('error! please try again.');
            } else {
                console.log('create successful');
                callback();
            }
        });
    },
    getNidByUsername : function(name, callback) {
        var showSql = 'select nid from shared_note where username = ?';
        connection.query(showSql,[name], function(err, rows, fields) {
            if (err != null) {
                console.log('error!');
            } else {
                console.log('getNidByUsername=>success');
                callback(rows);
            }
        });
    }
}

module.exports = dao;
