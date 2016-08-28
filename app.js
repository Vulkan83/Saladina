/******************************************/

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);


/******************** VARIABLES **********************/

var water = {};
/*
var water = require(path.join(__dirname + '/modules/WaterController.js'));
water.setWaterPump (5);
water.setLevelController(6);

var light = require(path.join(__dirname + '/modules/LightController.js'));
light.setSensor(0);

var temperature = require(path.join(__dirname + '/modules/TemperatureController.js'));
temperature.resetSensor(1);
*/

//socket.io
var io = require(path.join(__dirname + '/modules/socket.js')).listen(http, water);

/******************** MIDDLEWARE **********************/


app.use('/client', express.static(__dirname + '/client'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/fa', express.static(__dirname + '/node_modules/font-awesome'));


/**************** Routes **************************/


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
});


/******************** LOOP **********************/


 //routineFunctions();


/******************** FUNCTIONS **********************/


function routineFunctions () {
    
    var lightValue = light.getSensorValue();
    var temperatureValue = temperature.getSensorValue();
    
    io.sockets.emit('set_light_level', {light: lightValue});
    io.sockets.emit('set_temperature_level', {temperature: temperatureValue});
    
    setTimeout(routineFunctions, 1000);
}


/******************************************/
//console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');
});