/*
    this is used to serve qml files for development

    start it with 'node serve.js' and connect from client
*/

const chokidar = require('chokidar');
const finalhandler = require('finalhandler');
const http = require('http');
const path = require('path');
const serveStatic = require('serve-static');
const _ = require('lodash')

const http_port = 44333;
const ws_port = 44334;

const source_path = path.resolve(__dirname);

// -----------------------------------
// HTTP SERVER - serve up qml folder
// -----------------------------------
const serve = serveStatic(source_path, { index: ['index.qml'] });

// Create http server
const server = http.createServer(function onRequest(req, res) {
  console.log(req.url);
  serve(req, res, finalhandler(req, res));
});

server.listen(
  http_port,
  console.log.bind(null, `http server listening on port ${http_port}`),
);

// ----------------------------------------------------------------
// Websocket server - used to send reload notification to clients
// ----------------------------------------------------------------
const WebSocketServer = require('ws').Server,
  wss = new WebSocketServer(
    { host: '0.0.0.0', port: ws_port },
    console.log.bind(null, `websocker server listening on port ${ws_port}`),
  );

let clients = {};
wss.on('connection', function connection(ws) {
  console.log('client connected');

  const client_id = Math.random();

  clients[client_id] = ws;

  ws.on('close', function() {
    console.log('client disconnected');

    delete clients[client_id];
  });
});

// ----------------------------------------------------------
// File watcher - on file change send reload over websocket
// ----------------------------------------------------------
const watcher = chokidar.watch(source_path, {
  ignored: [/[\/\\]\./, /android/],
  persistent: true,
});

console.log(`watching ${source_path} for changes`);

watcher.on('change', _.debounce(function(path) {
  console.log('change:', path);

  for (let client_id in clients) {
    const client = clients[client_id];

    client.send(`{ "action": "reload"}`);
  }
}, 300));
