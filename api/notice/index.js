var express = require('express');
var controller = require('./notice_controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/', controller.index);
router.post('/', controller.create);
router.get('/list', controller.list);

module.exports = router;
