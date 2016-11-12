var Group = require('./group_model');
var Notice = require('../notice/notice_controller');
var validator = require('validator');
var _ = require('lodash');
var Common = require('../common');

// Get list of favs
exports.index = function(req, res) {
    Group.find({}, function(err, groups) {
        if (err) return Common.createErrorResponse();

        res.json(Common.createResponse(groups));
    });
};

// Get a single fav
exports.show = function(req, res) {
    //57e610e0c89d1f5dfdcc1404
    var id = req.query.id || '';

    //バリデーション
    var errors = [];
    if (validator.isNull(id)) errors.push('IDを入力してください');

    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));


    Group.findOne({_id: id}, function(err, groups) {
        if (err) return Common.createErrorResponse();

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

    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));

    var newGroup = new Group(groupData);
    newGroup.save(function(err) {
        if (err) return Common.createErrorResponse();
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
    if (validator.isNull(groupId)) errors.push('グループ名を入力してください');

    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));

    Group.findOne({_id: groupId}, function(err, group) {
        if (err) return Common.createErrorResponse();
        if (!group) return Common.createErrorResponse(['該当するグループがありません']);
        group.name = groupData.name;
        group.member_ids = groupData.member_ids;
        group.save(function(err) {
            if (err) return Common.createErrorResponse();
            //お知らせに追加
            _.each(group.member_ids, function(id) {
                Notice.make({
                    user_id: id,
                    group_id: groupId,
                    message: 'グループ「' + group.name + '」に招待されました',
                    type: 'invitation'
                });
            });
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
    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));

    Group.findOne({_id: groupId}, function(err, group) {
        if (err) return Common.createErrorResponse();
        if (!group) return Common.createErrorResponse(['該当するグループがありません']);
        group.message = groupData.message;
        group.save(function(err) {
            if (err) return Common.createErrorResponse();
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
    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));

    Group.findOne({_id: groupId}, function(err, group) {
        if (err) return res.json(Common.createErrorResponse());
        if (!group) return res.json(Common.createErrorResponse(['該当するグループがありません']));
        var reactionList = group.reactions || [];
        reactionList.unshift(reactionData);
        reactionList = _.uniqBy(reactionList, 'user_id');
        group.reactions = reactionList;
        group.save(function(err) {
            if (err) return res.json(Common.createErrorResponse());
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

    if (errors.length > 0) return res.json(Common.createErrorResponse(errors));
    
    Group.find(leaderData, function(err, groups) {
        if (err) return Common.createErrorResponse();
        if (!groups) return res.json(Common.createErrorResponse(['アカウントIDまたはパスワードが正しくありません']));

        res.json(Common.createResponse(groups));
    });
};
