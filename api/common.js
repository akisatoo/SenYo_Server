
exports.createResponse = function(res) {
    return {
        status: 'success',
        res: res
    };
};


exports.createErrorResponse = function(errors) {
    return {status: 'error', errors: errors || ['原因不明のエラーです']};
};

