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
        socket.emit('set_status', {pumpStatus:water.pumpStatus, isActivable:water.isActivable});
        
        socket.on('disconnect', function() {
            console.log('user disconnect');
            connectedUsers -= 1;
            io.sockets.emit('update_user_number', {totalUser:connectedUsers});
        });
        
        
        socket.on('get_status', function() {
            socket.emit('set_status', {pumpStatus:water.pumpStatus, isActivable:water.isActivable});
        });
        
        
        socket.on('toggle_pump', function() {
            console.log("pompa: "+water.pumpStatus);
            water.pumpStatus = !water.pumpStatus
            if(water.pumpStatus) {
                water.waterPumpON();
                io.sockets.emit('water_pump_on');
            } else {
                water.waterPumpOFF();
                io.sockets.emit('water_pump_off');
            }
        });
        
        
    });

    return io
}


/*============================ Functions ==============================*/


