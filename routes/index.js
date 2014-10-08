var express = require('express');
var dao = require('../daos/note_dao.js');
var userDao = require('../daos/userDao.js');
var router = express.Router();

/*Note list*/
router.post('/list', function(req, res) {
    var name = req.body.user.name;
    var passwordToCheck =  req.body.user.password;
    //Check user
    userDao.getPassword(name, function(password) {
        if (password == passwordToCheck) {
            console.log('login successful.');
            passwordToCheck = null;
        } else {
            passwordToCheck = null;
            res.redirect('/login');
            return;
        }
    });
    
    //Show note list
    dao.show(function(notelist) {
    //console.log('notelist ' + notelist);

    var noteArr = [];
    for (var i=0; i < notelist.length; i++) {
    	var note = {id:'', title: '', content: ''};
        note.id = notelist[i].nid;
        //console.log('nid' + note.id);
    	note.title = notelist[i].name;
    	note.content = notelist[i].content;
    	noteArr.push(note);
        
        if (note.content.length > 80) {
            note.content = note.content.substr(0,80) + "...";
        }
    }
    
    res.render('list', { notes: noteArr});
    });
    
});

router.get('/list', function(req, res) {
    //Show note list
    dao.show(function(notelist) {
    console.log('note ' + notelist);

    var noteArr = [];
    for (var i=0; i < notelist.length; i++) {
    	var note = {id:'', name: '', content: ''};
        note.id = notelist[i].nid;
    	note.title = notelist[i].name;
    	note.content = notelist[i].content;

        if (note.content.length > 80) {
            note.content = note.content.substr(0,80) + "...";
        }
    	noteArr.push(note);
    }
    
    res.render('list', { notes: noteArr});
    });
    //res.redirect('/login');
});

/*Login by Get*/
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'welcome to ccnote'});
});

/* GET home page. */
router.get('/show', function(req, res) {
    res.render('index', { title: 'show' });
});

/* Create a note. */
router.get('/create', function(req, res) {
    res.render('index', {title: 'Create' });
});

/* Edit note */
router.get('/edit', function(req, res) {
    res.render('edit', {title: 'Edit' });
});

/* Delete a note. */
router.get('/delete', function(req, res) {
    res.render( 'index', {title: 'delete' });
});

module.exports = router;
