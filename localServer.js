
var config			= require('./config.json');
var oscBridge		= null;
var {Websocket} = require( "./websocket.js")
var UdpOsc			= require('./lib/udpOsc');
var config			= require('./config.json');

//本機端橋接udp
var oscBridge = new UdpOsc({
  port : config.udp.port,
  targetHost : config.udp.target.host,
  targetPort : config.udp.target.port
});
// console.log(oscBridge)
// oscBridge.send({ address: '/start', args: [ { value: '99999' } ] })

console.log("\n=======================================\n")
console.log("socket.io <-> msp v2.0 | Local Server Started!")
console.log("\n=======================================\n")
console.log("Target: "+ config.target.host + ":"+ config.target.port)
console.log("[UDP] bind to port "+ config.udp.target.port)

let startMes = { address: '/starttime', args: [ { value: (new Date()).toString() } ] }

console.log("\n---------------------------------------\n")
console.log("[Test Message]: \npath: /starttime")
console.log(startMes)
console.log("\n---------------------------------------\n")



//連接socket.io
var socket = Websocket.getInstance({'host' : config.target.host + ":"+ config.target.port});
socket.receiveMsg("osc",function(data){
  console.log((new Date()).toString(),data)
  oscBridge.send(data)
})