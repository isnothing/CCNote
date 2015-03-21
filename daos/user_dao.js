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
    create : function(user, callback) {
        var name = user.name;
        var password = user.password;
        console.log("create user=>" + name + " " + password);
        var createSql = 'insert into user(name, password) values(?, ?)';
        connection.query(createSql, [name,password],function(err, rows, fields){
            if (err != null) {
                console.log('error! please try again.');
            } else {
                console.log('create successful');
                callback();
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
