var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, required: 'グループ名を入力してください'},
    leader_id: { type: String, required: 'リーダーIDを入力してください'},
    member_ids: [String],
    message: String,
    calling_flag: Boolean,
    reactions: { type : Array , "default" : [] }
});

module.exports = mongoose.model('Group', GroupSchema);

