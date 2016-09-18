var socket = io();
var pumpBlocked = false;


$("#toggle-pump").on('click', function(e){
    socket.emit('toggle_pump');
});


socket.on('update_user_number', function(data) {
    $('#total-user').html(data.totalUser)
});


socket.on('water_pump_on', function(data) {
    $('#toggle-pump').removeClass('btn-warning');
    $('#toggle-pump').removeClass('btn-success');
    $('#toggle-pump').removeClass('disabled');
    $('#toggle-pump').addClass('btn-danger');
    $('#toggle-pump').html('<i class="fa fa-pause"></i> pump off')
});


socket.on('water_pump_off', function(data) {
    $('#toggle-pump').removeClass('btn-danger');
    $('#toggle-pump').removeClass('btn-warning');
    $('#toggle-pump').removeClass('disabled');
    $('#toggle-pump').addClass('btn-success');
    $('#toggle-pump').html('<i class="fa fa-play"></i> pump on');
});


socket.on('pump_blocked', function(data) {
    if(!pumpBlocked) {
        $('#toggle-pump').removeClass('btn-danger');
        $('#toggle-pump').removeClass('btn-success');
        $('#toggle-pump').addClass('btn-warning');
        $('#toggle-pump').addClass('disabled');
        $('#toggle-pump').html('<i class="fa fa-times"></i> pump blocked');
    }
});


socket.on('set_light_level', function(data) {
  $('#label-light').html (data.light);  
});


socket.on('set_temperature_level', function(data) {
  $('#label-temp').html (data.temperature);  
});


window.onunload = function(e) {
    socket.emit("disconnect");
}