// var LindaClient = require('linda').Client
var LindaClient = require('../../').Client;
//var server_url = "https://linda-server.herokuapp.com";
var socket = require('socket.io-client').connect('https://pakaruland.herokuapp.com/');

var linda = new LindaClient().connect(socket);
var ts = linda.tuplespace('pakaruland');


linda.io.on('connect', function(){
  console.log('connect!!!');
  ts.watch({type: "chat"}, function(err, tuple){
    const user = tuple.data.who;
    const message = tuple.data.message;
      console.log(user + "<" + message);
      //document.getElementById(puser).src = "images/l/" + pmessages + ".jpg";
  });
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data){
  ts.write({
    type: "chat",
    message: data.replace(/[\r\n]/g, '')
  });
});
