const { Socket } = require("dgram")

module.exports = {
    connect: function(io){
        io.on('connection', (socket) => {
            console.log('user connect: ' + socket.id);
            
            socket.on('message', (message) => {
                io.emit('message', message);
            })
        });
    }
}
