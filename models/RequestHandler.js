var noteDao = require("../daos/note_dao.js");

var Handler = {
    handleAdd: function(note, callback) {
        //console.log('handle' + note.title);       
        noteDao.create(note, function(nid) {
              if (nid != -1) {
                  callback(nid);
              } else {
                  callback(nid);
              }
        });
    },
    handleUpdate: function(note, callback) {
        console.log('handle update=>' + note.content); 
        noteDao.update(note, function(err) {
              if (err == null) {
                  callback(0);
              } else {
                  callback(1);
              }
        });
    },
    handleDelete: function(nid, callback) {
        noteDao.remove(nid, function(err) {
              if (err == null) {
                  callback(0);
              } else {
                  callback(1);
              }
        });
    },
    handleShow: function(note, callback) {
      noteDao.findByNid(note, function(data) {
        var note = {nid:data[0].nid, title:data[0].name, content:data[0].content};
        callback(note);
      });
    }
};

module.exports = Handler;
