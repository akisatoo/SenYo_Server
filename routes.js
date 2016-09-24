module.exports = function(app) {
    
    //User
    app.use('/api/user', require('./api/user'));

    //Group
    app.use('/api/group', require('./api/group'));

    //app.route('/:url(api|auth|components|app|brower_components|assets)/*').get(errors[404]);

    app.route('/*').get(function(req, res) {
        //res.sendfile(app.get('appPath' + '/index.html');
    });

};
