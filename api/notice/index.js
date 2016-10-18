var express = require('express');
var controller = require('./notice_controller');

var router = express.Router();

router.get('/:id', controller.show);
router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
