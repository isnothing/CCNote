var express = require('express');
var dao = require('../daos/userDao.js');
var router = express.Router();

/*Login*/
router.get('/login', function(req, res) {
    if (dao.query(req.name) == req.password) {
        res.render("successful!");
    } else {
        res.render("error!");
    }
});

module.exports = router;
