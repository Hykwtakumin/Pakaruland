// var LindaClient = require('linda').Client
var LindaClient = require('../../').Client;
//var server_url = "https://linda-server.herokuapp.com";
var socket = require('socket.io-client').connect('https://pakaruland.herokuapp.com/');

var linda = new LindaClient().connect(socket);
var ts = linda.tuplespace('pakaruland');

var myName = document.getElementById("name").value;



linda.io.on('connect', function(){
  myName = document.getElementById("name").value;
  if (window.localStorage) localStorage.name = myName;
  console.log('connect!!!');
  ts.watch({type: "chat"}, function(err, tuple){
    const user = tuple.data.who;
    const message = tuple.data.message;
    if (nameArray.includes(user)) {
      console.log(user + "<" + message);
      //document.getElementById(puser).src = "images/l/" + pmessages + ".jpg";
    }
  });
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data){
  ts.write({
    who: myName,
    type: "chat",
    message: data.replace(/[\r\n]/g, '')
  });
});
