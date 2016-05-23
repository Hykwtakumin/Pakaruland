// var LindaClient = require('linda').Client
var LindaClient = require('../../').Client;
//var server_url = "https://linda-server.herokuapp.com";
var socket = require('socket.io-client').connect('https://pakaruland.herokuapp.com/');

var linda = new LindaClient().connect(socket);
var ts = linda.tuplespace('pakaruland');

linda.io.on('connect', function(){
  console.log('connect!!!');

  ts.watch({type: "chat"}, function(err, tuple){
    console.log("> " + tuple.data.message + " (from:" + tuple.from + ")");
  });

});

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data){
  ts.write({
    type: "chat",
    message: data.replace(/[\r\n]/g, '')
  });
});
