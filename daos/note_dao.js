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

    },
    remove : function(nid, callback) {

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
    }
}

module.exports = dao;
