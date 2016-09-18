var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);

var LightSensor = require(__dirname + '/modules/LightController.js');
var TemperatureSensor = require(__dirname + '/modules/TemperatureController.js');
var WaterController = require(__dirname + '/modules/WaterController.js');
var LedController = require(__dirname + '/modules/LedController.js');
var ButtonController = require(__dirname + '/modules/ButtonController.js');
/******************** VARIABLES **********************/

var water = new WaterController();
water.setWaterPump (5);

var light = new LightSensor();
light.setSensor(0);111

var temperature = new TemperatureSensor(); 
temperature.setSensor(1);

var powerUpLed = new LedController ();
powerUpLed.setActuator(3);

var pumpStatusLed = new LedController ();
pumpStatusLed.setActuator(4);


//socket.io
var io = require(__dirname + '/modules/Socket.js').listen(http, water);

/******************** MIDDLEWARE **********************/

app.use('/client', express.static(__dirname + '/client'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/fa', express.static(__dirname + '/node_modules/font-awesome'));


/**************** Routes **************************/

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
});

/******************************************/

powerUpLed.write(1);
routineFunctions();

/******************** FUNCTIONS **********************/

function routineFunctions () {
    
     
    //check pumpState
    if(!water.pumpStatus) {
        pumpStatusLed.write(0);
    } else {
        pumpStatusLed.write(1);
    }
    
    var lightValue = light.readSensorValue();
    var temperatureValue = temperature.readSensorValue();
    
    io.sockets.emit('set_light_level', {light: lightValue});
    io.sockets.emit('set_temperature_level', {temperature: temperatureValue});
    
    setTimeout(routineFunctions, 1000);
}


/******************************************/
http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');
});