var mysql = require('mysql');
var app = require('../app.js');
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
    getPassword : function(name, callback) {
        var showSql = 'select password from user where name = ?';
        connection.query(showSql,[name], function(err, rows, fields) {
            if (err != null) {
                console.log('error!');
            } else {
                if (rows.length != 0) {
                    callback(rows[0].password);
                } else {
                    console.log('The user dont exist.');
                    callback(null);
                }
            }
        });
    }
}

module.exports = dao;
