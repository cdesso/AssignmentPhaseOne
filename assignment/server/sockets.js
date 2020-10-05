const { Socket } = require("dgram")
var fs = require('fs');

module.exports = {
    connect: function(io, db){
        var rooms = [];
        var socketRoom = []
        var socketRoomnum = []
        const chat = io.of('/chat')
        var collection = db.collection('groups');

        chat.on('connection', async (socket) => {
            groups = await collection.find({}).toArray();
            for (i in groups){
                for (j in groups[i].channels){
                    rooms.push(groups[i].groupName + "-" + groups[i].channels[j].channelName)
                }
            }

            socket.on('message', async (message)=> {
                for (i=0; i<socketRoom.length; i++){
                    if (socketRoom[i][0] == socket.id){
                        groupChannel = socketRoom[i][1].split('-');
                        try{
                            if (message[0] && message[1]){
                                await collection.updateOne(
                                    {'$and': [
                                        {'groupName': groupChannel[0]}, 
                                        {'channels.channelName': groupChannel[1]}
                                    ]}, 
                                    {'$push':{'channels.$.messages': message}})
                                }
                            groups = await collection.find({'$and': [
                                {'groupName': groupChannel[0]}, 
                                {'channels.channelName': groupChannel[1]}
                            ]}).toArray();
                        } catch (err){
                            throw err;
                        }
                        
                        chat.to(socketRoom[i][1]).emit('message', groups[0].channels[0].messages);
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
    
            socket.on('joinRoom', (data)=>{ 
                room = data[0]
                user = data[1]         
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
                        chat.in(room).emit('notice', user+" has joined the channel")
                    });
                    return chat.in(room).emit('joined', room);
                }
            })

            socket.on('leaveRoom', (data) => {
                room = data[0]
                user = data[1]
                for (let i=0; i<socketRoom.length; i++){
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i, 1);
                        socket.leave(room);
                        chat.to(room).emit('notice', user + " has left the channel")
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
    }
}
