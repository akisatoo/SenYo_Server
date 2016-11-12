var User = require('./user_model');
var validator = require('validator');
var Common = require('../common');

// Get list of favs
exports.index = function(req, res) {
    User.find({}, function (err, user) {
        if (err) return;
        if (!user) return res.send(500);
        res.json(user);
    });
};

// Get a single fav
exports.show = function(req, res) {
    User.find({}, function (err, user) {
        if (err) return;
        if (!user) return res.send(500);
        console.log(user);
        res.json(user);
    });
};

// Creates a new fav in the DB.
exports.create = function(req, res) {

    var userData = {
        account_id: req.body.account_id || '',
        password: req.body.password || '',
        name: req.body.name || '',
        image: ''
    };
    
    //バリデーション
    var errors = [];
    if (validator.isNull(userData.account_id)) errors.push('アカウントIDを入力してください');
    if (!validator.isAlphanumeric(userData.account_id)) errors.push('アカウントIDは半角英数字を入力してください');
    if (validator.isNull(userData.password)) errors.push('パスワードを入力してください');
    if (!validator.isLength(userData.password, {min: 4, max: 8}) || !validator.isAlphanumeric(userData.password)) errors.push('パスワードには4〜8文字の半角英数字を入力してください');
    if (validator.isNull(userData.name)) errors.push('ユーザー名を入力してください');

    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));

    var newUser = new User(userData);
    newUser.save(function(err) {
        if (err) return res.json(Common.createErrorResponse(Common.getErrorMessage(err.errors)));
        res.json(Common.createResponse(newUser));
    });
};

exports.login = function(req, res) {

    var loginData = {
        account_id: req.body.account_id || '',
        password: req.body.password || ''
    };
    
    //バリデーション
    var errors = [];
    if (validator.isNull(loginData.account_id)) errors.push('アカウントIDを入力してください');
    if (!validator.isAlphanumeric(loginData.account_id)) errors.push('アカウントIDは半角英数字を入力してください');

    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));

    User.findOne(loginData, function(err, user) {
        if (err) return res.json(Common.createErrorResponse());
        if (!user) return res.json(Common.createErrorResponse(['アカウントIDまたはパスワードが正しくありません']));

        res.json(Common.createResponse(user));
    });
};
