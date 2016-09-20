module.exports = function(app) {
    
    //
    app.use('/api/user', require('./api/user'));

    //app.route('/:url(api|auth|components|app|brower_components|assets)/*').get(errors[404]);

    app.route('/*').get(function(req, res) {
        //res.sendfile(app.get('appPath' + '/index.html');
    });

};
