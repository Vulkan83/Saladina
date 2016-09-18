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