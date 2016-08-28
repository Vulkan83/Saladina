/* ============= init modules  ============= */
var socketio = require('socket.io')

var connectedUsers = 0;
/*============================ export module ==============================*/
module.exports.listen = function(server, water){
    
	io = socketio.listen(server);
    
    io.on('connection', function(socket){ 
    	console.log('socket connection success');
        
        console.log('user connected');
        connectedUsers += 1;
        io.sockets.emit('update_user_number', {totalUser:connectedUsers});

        
        socket.on('disconnect', function() {
            console.log('user disconnect');
            connectedUsers -= 1;
            io.sockets.emit('update_user_number', {totalUser:connectedUsers});
        });
        
        
        /*
        socket.on('toggle_pump', function() {
            water.pumpStatus = !water.pumpStatus
            if(water.pumpStatus) {
                water.WaterPumpON();
                io.sockets.emit('water_pump_on');
            } else {
                water.WaterPumpOFF();
                io.sockets.emit('water_pump_off');
            }
        });
        */
        
        
    });

    return io
}


/*============================ Functions ==============================*/


