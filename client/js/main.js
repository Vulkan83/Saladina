var socket = io();
var pumpBlocked = false;


/******* socket.io ************************/

socket.emit('get_status')


$("#toggle-pump").on('click', function(e) {
    socket.emit('toggle_pump');
});


socket.on('update_user_number', function(data) {
    $('#total-user').html(data.totalUser)
});


socket.on('set_status', function(data) {
    pumpBlocked = data.isActivable;
    if(data.pumpStatus) powerOnPump();
});


socket.on('pump_avviable', function(data) {
    if(pumpBlocked) {
        console.log('sblocco la pompa');
        pumpBlocked = false;
        powerOffPump();
    }
});


socket.on('water_pump_on', function(data) {
    powerOnPump ();
});


socket.on('water_pump_off', function(data) {
    powerOffPump();
});


socket.on('pump_blocked', function(data) {
    if(!pumpBlocked) {
        pumpBlocked = true;
        blockPump ();
    }
});


socket.on('set_light_level', function(data) {
  $('#label-light').html (data.light);  
});


socket.on('set_temperature_level', function(data) {
  $('#label-temperature').html (data.temperature);  
});


window.onunload = function(e) {
    socket.emit("disconnect");
}



/**********************************************************/


function powerOnPump () {
    $('#toggle-pump').removeClass('btn-warning');
    $('#toggle-pump').removeClass('btn-success');
    $('#toggle-pump').removeClass('disabled');
    $('#toggle-pump').addClass('btn-danger');
    $('#toggle-pump').html('<i class="fa fa-pause"></i> pump off');
}


function powerOffPump () {
    $('#toggle-pump').removeClass('btn-danger');
    $('#toggle-pump').removeClass('btn-warning');
    $('#toggle-pump').removeClass('disabled');
    $('#toggle-pump').addClass('btn-success');
    $('#toggle-pump').html('<i class="fa fa-play"></i> pump on');    
}


function blockPump () {
    $('#toggle-pump').removeClass('btn-danger');
    $('#toggle-pump').removeClass('btn-success');
    $('#toggle-pump').addClass('btn-warning');
    $('#toggle-pump').addClass('disabled');
    $('#toggle-pump').html('<i class="fa fa-times"></i> pump blocked');
}