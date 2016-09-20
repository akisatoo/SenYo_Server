var express = require('express');
var controller = require('./user_controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/login', controller.login);

module.exports = router;
