var express = require('express');
var controller = require('./user_controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/', controller.show);
router.post('/', controller.create);
router.post('/login', controller.login);
router.get('/search', controller.search);

module.exports = router;
