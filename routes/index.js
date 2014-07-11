var express = require('express');
var dao = require('../daos/note_dao.js');
var router = express.Router();

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
