var express = require('express');
var controller = require('./group_controller');

var router = express.Router();

router.get('/', controller.show);
//router.get('/', controller.index);
router.post('/', controller.create);
router.post('/edit', controller.edit);
router.post('/message', controller.message);
router.post('/reaction', controller.reaction);
router.get('/list', controller.list);
router.post('/approval', controller.approval);

module.exports = router;
