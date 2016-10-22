var _ = require('lodash');

exports.createResponse = function(res) {
    return {
        status: 'success',
        res: res
    };
};


exports.createErrorResponse = function(errors) {
    return {status: 'error', errors: errors || ['原因不明のエラーです']};
};


exports.getErrorMessage = function(errors) {
    var errMsgs = [];

    _.each(errors, function(err) {
        errMsgs.push(err.message);
    });

    return errMsgs;
};
