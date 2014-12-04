var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'ccnote'
});

var dao = {
    create : function(note, callback) {
        var title = note.title;
        var content = note.content;
        var createSql = 'insert into note(name, content) values(?, ?)';
        console.log(title + content);
        connection.query(createSql, [title,content],function(err, rows, fields){
            //the callback function used for handling the err
            console.log(rows);
            callback(err);
        });
    },
    update : function(note, callback) {
        var nid = note.nid;
        var title = note.title;
        var content = note.content;
        var createSql = 'update note set title = ? and content = ? where nid = ?';
        console.log(title + content);
        connection.query(createSql, [title,content,nid],function(err, rows, fields){
            //the callback function used for handling the err
            console.log(rows);
            callback(err);
        });
    },
    remove : function(nid, callback) {
        var title = note.title;
        var content = note.content;
        var createSql = 'delete from note where nid = ?';
        console.log(title + content);
        connection.query(createSql, [nid],function(err, rows, fields){
            //the callback function used for handling the err
            console.log(rows);
            callback(err);
        });
    },
    show : function(callback) {
        var showSql = 'select nid, name, content from note order by nid desc';
        connection.query(showSql, function(err, rows, fields) {
            if (err != null) {
                console.log('error! please try again.');
            } else {
                callback(rows);
            }
        });
    },
    findByNid : function(note, callback) {
        var showSql = 'select nid, name, content from note where nid = ?';
        connection.query(showSql, [note.nid], function(err, rows, fields) {
            if (err != null) {
                console.log('error! please try again.');
            } else {
                callback(rows);
            }
        });
    }
}

module.exports = dao;
