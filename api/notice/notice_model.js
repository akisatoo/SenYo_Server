var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var NoticeSchema = new Schema({
    user_id: String,
    group_id: String,
    message: String,
    type: String
});

module.exports = mongoose.model('Notice', NoticeSchema);

