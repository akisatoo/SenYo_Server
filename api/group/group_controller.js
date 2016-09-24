var Group = require('./group_model');
var validator = require('validator');
var _ = require('lodash');
var Common = require('../common');

// Get list of favs
exports.index = function(req, res) {
    Group.find({}, function(err, groups) {
        if (err) return Common.createErrorResponse(true);

        res.json(Common.createResponse(groups));
    });
};

// Get a single fav
exports.show = function(req, res) {
    //57e610e0c89d1f5dfdcc1404
    console.log('show');
    Group.findOne({_id: '57e610e0c89d1f5dfdcc1404'}, function(err, groups) {
        if (err) return Common.createErrorResponse(true);

        res.json(Common.createResponse(groups));
    });
};

// Creates a new fav in the DB.
exports.create = function(req, res) {

    var groupData = {
        leader_id: req.body.leader_id || '',
        member_ids: req.body.member_ids || [],
        name: req.body.name || '',
        message: req.body.message || '',
        calling_flag: req.body.calling_flag || false,
        reactions: req.body.reactions || []
    };
    
    //バリデーション
    var errors = [];
    if (validator.isNull(groupData.leader_id)) errors.push('リーダーIDを入力してください');
    if (validator.isNull(groupData.name)) errors.push('グループ名を入力してください');

    if (errors.length > 0) return res.json(Common.createErrorResponse(true, errors));

    var newGroup = new Group(groupData);
    newGroup.save(function(err) {
        if (err) return Common.createErrorResponse(true);
        res.json(Common.createResponse(newGroup));
    });
};

// Edit Group
exports.edit = function(req, res) {

    var groupId = req.body.group_id || '';
    var groupData = {
        member_ids: req.body.member_ids || [],
        name: req.body.name || ''
    };
    
    //バリデーション
    var errors = [];
    if (validator.isNull(groupData.name)) errors.push('グループ名を入力してください');

    if (errors.length > 0) return res.json(Common.createErrorResponse(true, errors));

    Group.findOne({_id: groupId}, function(err, group) {
        if (err) return Common.createErrorResponse(true);
        if (!group) return Common.createErrorResponse(true, ['該当するグループがありません']);
        group.name = groupData.name;
        group.member_ids = groupData.member_ids;
        group.save(function(err) {
            if (err) return Common.createErrorResponse(true);
            res.json(Common.createResponse(group));
        });
    });
};

// EditGroupMessage
exports.message = function(req, res) {

    var groupId = req.body.group_id || '';
    var groupData = {
        message: req.body.message || ''
    };
    
    //バリデーション
    var errors = [];
    if (errors.length > 0) return res.json(Common.createErrorResponse(true, errors));

    Group.findOne({_id: groupId}, function(err, group) {
        if (err) return Common.createErrorResponse(true);
        if (!group) return Common.createErrorResponse(true, ['該当するグループがありません']);
        group.message = groupData.message;
        group.save(function(err) {
            if (err) return Common.createErrorResponse(true);
            res.json(Common.createResponse(group));
        });
    });
};

// EditGroupMessage
exports.reaction = function(req, res) {

    var groupId = req.body.group_id || '';
    var reactionData = {
        user_id: req.body.user_id || '',
        reaction_id: req.body.reaction_id || ''
    };
    
    //バリデーション
    var errors = [];
    if (errors.length > 0) return res.json(Common.createErrorResponse(true, errors));

    Group.findOne({_id: groupId}, function(err, group) {
        if (err) return res.json(Common.createErrorResponse(true));
        if (!group) return res.json(Common.createErrorResponse(true, ['該当するグループがありません']));
        var reactionList = group.reactions || [];
        reactionList.unshift(reactionData);
        reactionList = _.uniqBy(reactionList, 'user_id');
        group.reactions = reactionList;
        console.log(group.reactions);
        group.save(function(err) {
            if (err) return res.json(Common.createErrorResponse(true));
            res.json(Common.createResponse(group));
        });
    });
};



exports.list = function(req, res) {

    var leaderData = {
        leader_id: req.body.leader_id || ''
    };
    
    //バリデーション
    var errors = [];
    if (validator.isNull(leaderData.leader_id)) errors.push('リーダーIDを入力してください');

    if (errors.length > 0) return res.json(Common.createErrorResponse(true, errors));
    
    Group.find(leaderData, function(err, groups) {
        if (err) return Common.createErrorResponse(true);
        if (!groups) return res.json(Common.createErrorResponse(true, ['アカウントIDまたはパスワードが正しくありません']));

        res.json(Common.createResponse(groups));
    });
};
