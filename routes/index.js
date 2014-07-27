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
        } else {
            res.redirect('/login');
            return;
        }
    });
    
    //Show note list
    dao.show(function(notelist) {
    console.log('notelist ' + notelist);    
    res.render('list', {title: 'noteI'});
    });
    
});

/*Login*/
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
    dao.create('first', 'info');
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
