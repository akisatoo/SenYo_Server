
exports.createResponse = function(res) {
    return {
        status: 'success',
        res: res
    };
};


exports.createErrorResponse = function(success, errors) {
    return {status: success ? 'success' : 'errors', error: errors || ['原因不明のエラーです']};
};

