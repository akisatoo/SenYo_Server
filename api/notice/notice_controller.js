var Notice = require('./notice_model');
var validator = require('validator');
var _ = require('lodash');
var Common = require('../common');

// Get list of favs
exports.index = function(req, res) {
    console.log(req.param);
    Notice.find({}, function(err, groups) {
        if (err) return Common.createErrorResponse();

        res.json(Common.createResponse(groups));
    });
};

// Get a single fav
exports.show = function(req, res) {
    Notice.find({_id: '57e610e0c89d1f5dfdcc1404'}, function(err, groups) {
        if (err) return Common.createErrorResponse();

        res.json(Common.createResponse(groups));
    });
};

// Creates a new fav in the DB.
exports.create = function(req, res) {

    var noticeData = {
        notice_id: req.body.user_id || '',
        group_id: req.body.group_id || '',
        message: req.body.message || '',
        type: req.body.type || ''
    };
    
    //バリデーション
    var errors = [];

    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));

    var notice = new Notice(noticeData);
    notice.save(function(err) {
        if (err) return Common.createErrorResponse();
        res.json(Common.createResponse(noticeGroup));
    });
};


exports.make = function(noticeData) {
    noticeData = noticeData || {};
    var notice = new Notice(noticeData);
    
    notice.save(function(err) {});
    
    return;
};
