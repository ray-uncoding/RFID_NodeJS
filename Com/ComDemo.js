//Use serialport lib, you need setup serialport first
var coroutine = require("coroutine");
var SerialPort = require('serialport')

var serialPort = new SerialPort('COM4', {
    //serialport param
    baudRate : 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    autoOpen:false
})

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay)
        ;
}

var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x24,0x02,0x01,0x2B]; //Set ActiveMode
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x24,0x05,0x1A,0x0F];  //Set RF Power RF = 0x24 / 26 dbm
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x24,0x05,0x07,0x22];    //Set RF Power RF = 0x07 / 7 dbm
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x24,0x02,0x01,0x2B];    //Set ActiveMode
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x24,0x02,0x00,0x2C];    //Set AnswerMode
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x3F,0x31,0x80,0x62];   //Set Freq.  US band
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x3F,0x4E,0x00,0xC5];   //Set Freq.  EU band
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x24,0x0A,0x00,0x24];   //ScanArea :  EPC
//var buf1 = [0x53, 0x57, 0x00, 0x05,0xFF,0x24,0x0A,0x01,0x23];   //ScanArea :  TID

serialPort.open(function (err) {
    console.log('IsOpen:',serialPort.isOpen)
    console.log('err:',err)
    if(!err){
        console.log('Open Success')
        serialPort.write(buf1, function(err, results) {
            console.log('err ' + err);
        });
        serialPort.on('data',function (data) {
            console.log('data received: ',data)  //show data, need together data
            //data[15]: TagNum   data[16]: singleTagLength( include 1 byte type and 1 byte ant and 1 byte rssi
            //data[17] == 0x01: Tag Type   data[18]: AntNum  data[19]..[30]: TagContent data[31]:RSSI
            //if data[17] == 0x81 with TimeStamp, last 6 bytes is time
        })
    }
})

