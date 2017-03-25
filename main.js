var request = require('request');
var SerialPort = require("serialport");
var serialport = new SerialPort("/dev/tty.usbmodem1421", {
	baudRate : 38400,
	parser: SerialPort.parsers.readline('\n')
});

serialport.on('open', function(){
  console.log('Serial Port Opend');
  
  serialport.on('data', function(data){
  	console.log(data)
      request.post(  'http://data.sparkfun.com/input/[public_key]?private_key=[private_key]',
            { json: { name: data } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
  });
});
