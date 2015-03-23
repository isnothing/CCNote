var express = require('express');
var dao = require('../daos/note_dao.js');
var userDao = require('../daos/user_dao.js');
var sharedNoteDao = require('../daos/shared_dao.js');
var router = express.Router();
var async = require('async');

/*Note list*/
router.post('/list', function(req, res) {
    var username = req.body.user.name;
    var passwordToCheck =  req.body.user.password;
    //Check user
    userDao.getPassword(username, function(password) {
        if (password == passwordToCheck) {
            console.log('login=>' + username);
            req.session.username = username;
            passwordToCheck = null;
        } else {
            passwordToCheck = null;
            res.redirect('/login');
            return;
        }
    });
    //Show note list
    dao.selectByUsername(username, function(notelist) {
    //console.log('notelist ' + notelist);
    var noteArr = [];
    for (var i=0; i < notelist.length; i++) {
    	var note = {id:'', title: '', content: ''};
        note.id = notelist[i].nid;
        //console.log('nid' + note.id);
    	note.title = notelist[i].name;
    	note.content = notelist[i].content;
    	noteArr.push(note);
        if (note.content != null && note.content.length > 80) {
            note.content = note.content.substr(0,80) + "...";
        }
    }

    sharedNoteDao.getNidByUsername(username, function(nidArr) {
        async.map(nidArr, function(data, callback) {
                var note = {id: data.nid, title: '', content: ''};
                dao.findByNid(note , function(rows) {
                    var sharedNote = {id:'', title: '', content: ''};
                    sharedNote.id = rows[0].nid;
                    sharedNote.title = rows[0].name;
                    sharedNote.content = rows[0].content;
                    if (sharedNote.content != null && sharedNote.content.length > 80) {
                        sharedNote.content = sharedNote.content.substr(0,80) + "...";
                    }
                    console.log("sharedNote=>" + sharedNote);
                    callback(null , sharedNote);
                });
            }, function (err, sharedNoteArr) {
                if (err != null) {
                    console.log("post session : " + req.session.username);
                    console.log("sharedNoteArree err=>" + err);
                }
                res.render('list', { user: username, notes: noteArr, shared_notes: sharedNoteArr});
            });
    });
    });
    
});

router.get('/list', function(req, res) {
    // var username = req.body.user.name;
    // var passwordToCheck =  req.body.user.password;
    // //Show note list
    // dao.show(function(notelist) {
    // console.log('note ' + notelist);
    // var noteArr = [];
    // for (var i=0; i < notelist.length; i++) {
    // 	var note = {id:'', name: '', content: ''};
    //     note.id = notelist[i].nid;
    // 	note.title = notelist[i].name;
    // 	note.content = notelist[i].content;

    //     if (note.content.length > 80) {
    //         note.content = note.content.substr(0,80) + "...";
    //     }
    // 	noteArr.push(note);
    // }
    // console.log("session : " + req.session.username);
    // res.render('list', { user: username, notes: noteArr});
    // });
    res.redirect('/login');
});

/*Login by Get*/
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'welcome to ccnote'});
});

router.get('/', function(req, res) {
    res.render('login', {
        title: 'welcome to ccnote'});
});

/*Register by Get*/
router.get('/register', function(req, res) {
    res.render('register', {
        title: 'welcome to ccnote'});
});

/*Register by POST*/
router.post('/register', function(req, res) {
    var username = req.body.user.name;
    var password1 =  req.body.user.password;
    var password2 =  req.body.user.password1;
    if (password1 != password2 || username == null || username == '') {
        res.render('register', {
            title: 'welcome to ccnote'});
    } else {
        userDao.create(req.body.user, function() {
            res.render('login', {
                title: 'welcome to ccnote'});
        });
    }
});


router.get('/logout', function(req, res) {
    req.session.username = null;
    res.redirect("/login");
});

/* GET home page. */
router.get('/show', function(req, res) {
    var nid = req.query.nid;
    console.log(req.query.nid);
    // dao.update(nid);
    var note = {id:'122', name: 'test', content: 'test'};
    res.render('index', { "note": note });
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

router.post('/shareNote', function(req, res) {
    var nid =  req.body.nid;
    var username = req.body.username;
    console.log("share note =>" + nid + " " + username);
    sharedNoteDao.create(nid, username, function() {
        res.send('success');
    });
});

module.exports = router;
