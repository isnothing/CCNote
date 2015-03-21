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
        var username = note.username;
        var createSql = 'insert into note(name, content, user_name) values(?, ?, ?)';
        console.log(title + content + username);
        connection.query(createSql, [title,content, username],function(err, rows, fields){
            //the callback function used for handling the err
            console.log(rows);
            callback(err);
        });
    },
    update : function(note, callback) {
        var nid = note.nid;
        var name = note.title;
        var content = note.content;
        var sql = 'update note set name = ?, content = ? where nid = ?';
        console.log("update note=>" + name + content + nid);
        connection.query(sql,  [name, content, nid],function(err, rows){
            //the callback function used for handling the err
            if (err != null) {
                console.log('error! please try again.');
            } else {
                callback(rows);
            }
        });
        console.log();
    },
    remove : function(nid, callback) {
        var sql = 'delete from note where nid = ?';
        connection.query(sql, [nid],function(err, rows){
            //the callback function used for handling the err
            if (err != null) {
                console.log('error! please try again.');
            } else {
                console.log('delete success.');
            }
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
    },
    selectByUsername : function(username, callback) {
        var sql = 'select nid, name, content from note where user_name = ?';
        connection.query(sql, [username], function(err, rows, fields) {
            if (err != null) {
                console.log('select by uid error!' + uid);
            } else {
                callback(rows);
            }
        });
    }
}

module.exports = dao;
