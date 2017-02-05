var socketio = require('socket.io');

module.exports = sio;

function sio (server) {

    console.log("load socket.js: true");

    // Socket.IO
    var sio = socketio.listen(server);

    // 接続
    sio.sockets.on('connection', function(socket) {

        console.log("socket.id: " + socket.id);

        socket.on('login', function (data) {
            // if (!data.room || !data.name) {
            //     return;
            // }
            //
            // //socket.set('room', data.room);
            //
            // socket.join(data.room);
            //
            // sio.to(data.room).emit('afterlogin', {
            //     name: data.name,
            //     room: data.room
            // });
            console.log("login: " + socket.id);

        });


        socket.on('disconnect', function (data) {
            console.log('discconect id: ' + socket.id);
        });


    });

}
