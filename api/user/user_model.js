var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: 'ニックネームを入力してください'},
    account_id: { type: String, required: 'アカウントIDを入力してください', unique: true },
    password: {type: String, required: 'パスワードを入力してください'},
    image: String
});

UserSchema.plugin(uniqueValidator, { message: 'すでに登録されているアカウントIDです' });

module.exports = mongoose.model('User', UserSchema);

