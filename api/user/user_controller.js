var User = require('./user_model');
var validator = require('validator');

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

    //バリデーション
    validator.isNull(req.body.account_id);
    validator.isAlphanumeric(req.body.account_id);
    
    var userData = {
        account_id: req.body.account_id,
        name: req.body.name,
        password: req.body.password,
        image: req.body.image
    };

    var newUser = new User(userData);
    newUser.save(function(err) {
        if (err) return res.json(400, err);
        res.json(newUser);
    });
};

exports.login = function(req, res) {

    //バリデーション
    validator.isNull(req.body.account_id);
    validator.isAlphanumeric(req.body.account_id);
    
    var loginData = {
        account_id: req.body.account_id,
        password: req.body.password,
    };

    User.findOne(loginData, function(err, user) {
        if (err) return;
        if (!user) return res.json({status: 'success', error: 'アカウントIDまたはパスワードが正しくありません'});

        res.json(user);
    });
};
