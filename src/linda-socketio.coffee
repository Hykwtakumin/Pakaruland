http = require 'http'
url  = require 'url'
fs = require 'fs'
socketio = require 'socket.io'

class Linda
  constructor: ->
    fs.readFile __dirname+"/linda-socketio-client.js", (err, data) =>
      throw "client js load error" if err
      @client_js_code = data
  
  listen: (opts = {io: null, server: null}) ->
    unless opts.io instanceof socketio.Manager
      throw '"io" must be instance of Socket.IO'
    unless opts.server instanceof http.Server
      throw '"server" must be instance of http.Server'
    @io = opts.io
    @server = opts.server

    @server.on 'request', (req, res) =>
      _url = url.parse(decodeURI(req.url), true);
      if _url.pathname == "/js/linda-socketio.js"
        res.writeHead 200
        res.end @client_js_code

    @io.sockets.on 'connection', (socket) ->
      socket.on '__linda_write', (tuple) ->
        console.log "write tuple #{JSON.stringify tuple}"

module.exports = new Linda
