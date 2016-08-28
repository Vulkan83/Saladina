/*============================ require ==============================*/
var mraa = require('mraa'); //require mraa

/*============================ module ==============================*/
var Water = {
		
    waterPump: "",
    pumpStatus: false,
    pumpIsActivable: true,
    
    waterLevelController: "",
    lowLevelWater: false,

    
    SetWaterPump: function (pin) {
        this.waterPump = new mraa.Gpio(pin);
        this.waterPump.dir(mraa.DIR_OUT);
    },
    
    
    SetLevelController: function (pin) {
        this.waterLevelController = new mraa.Gpio(pin);
        this.waterLevelController.dir(mraa.DIR_IN);
    },
    
    
    ReadlowLevelWater: function () {
        this.lowLevelWater = this.waterLevelController.read();
    },

    
    WaterPumpON: function() {
        if(this.pumpIsActivable) {
            this.pumpStatus = true;
            this.waterPump.write(1);
        }
    },
    
    
    WaterPunpOFF: function() {
        this.pumpStatus: false,
        this.waterPump.write(0);
    },

    
    BlockWaterPump: function() {
        if(this.pumpIsActivable) {
            this.waterPump.write(0);
            this.status = false;
        }
    },
    
    
    ReactivateWaterPump: function () {
        this.pumpIsActivable = true;  
    },

    
    checkWaterLevel: function() {
        if(this.lowLevelWater) {
            this.BlockWaterPump();
            this.pumpIsActivable = false;
        } else {
            this.ReactivateWaterPump();
        }
    }
    
    
    
	
};


/*============================ export module ==============================*/
module.exports = Water;