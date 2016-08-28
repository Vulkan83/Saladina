//var socket = io();
var pumpBlocked = false;


$("#toggle-pump").on('click', function(e){
    console.log('toggle the pump')
    //socket.emit('toggle_pump');
});


// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
    console.log('geolocalizzo');
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  } );
});

$(document).ready(function() {
  loadWeather('Cagliari',''); //@params location, woeid
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'f',
        success: function(weather) {
            console.log(weather);
            $('#weather .thumbnail').attr('src', weather.image);
            $('#weather .city').text(weather.city);
            $('#weather .currently').text(weather.currently);
            $('#weather .sunrise').text(weather.sunrise);
            $('#weather .sunset').text(weather.sunset);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
}


/******* socket.io ************************/

/*
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
*/