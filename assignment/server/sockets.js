const { Socket } = require("dgram")
var fs = require('fs');


    
    // })


module.exports = {
    connect: function(io, rooms){
        var rooms = [];
        var socketRoom = []
        var socketRoomnum = []
        const chat = io.of('/chat')

        fs.readFile('./data/groups.json', 'utf8', function(err, data){
            if (err) throw err;
            let groups = JSON.parse(data);
            for (i in groups){
                for (j in groups[i].channels){
                    rooms.push(groups[i].groupName + "-" + groups[i].channels[j].channelName)
                }
            }

            chat.on('connection', (socket) => {
                

                socket.on('message', (message)=> {
                    for (i=0; i<socketRoom.length; i++){
                        if (socketRoom[i][0] == socket.id){
                            chat.to(socketRoom[i][1]).emit('message', message);
                        }
                    }
                })
            

                socket.on('userCount', (room) => {
                    var count = 0
                    for (i=0; i<socketRoomnum.length;i++){
                        if (socketRoomnum[i][0] == room){
                            count = socketRoomnum[i][1];
                        }
                    }

                    chat.in(room).emit('userCount', count)
                })
        
                socket.on('joinRoom', (room)=>{            
                    if (rooms.includes(room)){
                        socket.join(room, ( ) =>{
                            var inroomSocketArray = false;
                            
                            for (i=0; i<socketRoom.length; i++){
                                if (socketRoom[i][0] == socket.id){
                                    socketRoom[i][1] = room;
                                    inroom = true;
                                }
                            }
                            if (inroomSocketArray == false){
                                //add socketID/room record
                                socketRoom.push([socket.id, room]);
                                var hasroomnum = false
                                for (let j=0; j<socketRoomnum.length; j++){
                                    if (socketRoomnum[j][0] == room){
                                        socketRoomnum[j][1] += 1;
                                        hasroomnum = true;
                                    }
                                }

                                if (hasroomnum == false){
                                    socketRoomnum.push([room, 1]);
                                }
                            }
                            chat.in(room).emit('notice', "New user has joined")
                        });
                        return chat.in(room).emit('joined', room);
                    }
                })

                socket.on('leaveRoom', (room) => {
                    for (let i=0; i<socketRoom.length; i++){
                        if (socketRoom[i][0] == socket.id){
                            socketRoom.splice(i, 1);
                            socket.leave(room);
                            chat.to(room).emit('notice', "A user has left the channel")
                        }
                    }

                    for (let j=0; j<socketRoomnum.length; j++){
                        if(socketRoomnum[j][0] == room){
                            socketRoomnum[j][1] -= 1;
                            if (socketRoomnum[j][0] == 0){
                                socketRoomnum.splice(j, 1);
                            }
                        }
                    }
                });

                socket.on('disconnect', ()=>{
                    chat.emit('disconnect');
                    for (let i=0; i<socketRoom.length; i++){
                        if (socketRoom[i][0] == socket.id){
                            socketRoom.splice(i, 1);
                        }
                    }
                    for (let j=0; j<socketRoomnum.length; j++){
                        if (socketRoomnum[j][0] == socket.room){
                            socketRoomnum[j][1] -= 1;
                        }
                    }
                })
            });
        });
    }
}
