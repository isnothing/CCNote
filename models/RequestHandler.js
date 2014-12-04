var noteDao = require("../daos/note_dao.js");

var Handler = {
    handleAdd: function(note, callback) {
        //console.log('handle' + note.title);       
        noteDao.create(note, function(err) {
              if (err == null) {
                  callback(0);
              } else {
                  callback(1);
              }
        });
    },
    handleUpdate: function(note, callback) {

    },
    handleDelete: function(note, callback) {

    },
    handleShow: function(note, callback) {
      noteDao.findByNid(note, function(data) {
        var note = {nid:data[0].nid, title:data[0].name, content:data[0].content};
        callback(note);
      });
    }
};

module.exports = Handler;
