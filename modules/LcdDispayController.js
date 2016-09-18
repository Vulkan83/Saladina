/*============================ require ==============================*/
var mraa = require('mraa'); //require mraa
var LCD = require('jsupm_i2clcd');


/*============================ export module ==============================*/
module.exports = function () {
    		
    this.actuator;
var lcdDisplayTimer = 0;
var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);

    this.setActuator = function (pin) {
        this.sensor = new mraa.Gpio(pin);
        this.sensor.dir(mraa.DIR_OUT);
    },

    this.write = function (value) {
        this.sensor.write(value);
    }


	function lcdDisplay()
	{
	 var lums = 0;
	 myLcd.clear();
	 myLcd.setCursor(0,0);
	 myLcd.write('Cond: ' + localWeather);
	 
	 myLcd.setCursor(1,0);
	 myLcd.write('EC:' + EC_MS);
	 
	 myLcd.setCursor(1,8);
	 if (lightLevel < 100) {lums = 'L';} else if (lightLevel < 130) {lums = 'M';} else {lums = 'H';}
	 myLcd.write('L:' + lums);
	 
	 myLcd.setCursor(1,12); 
	 myLcd.write('T:' + tempSensor.value());
	} // lcdDisplay

    
};
