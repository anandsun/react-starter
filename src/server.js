const chokidar = require('chokidar');
const http = require('http');
const express = require('express');
const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('./client/webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

app.set('port', 3000);
app.set('distdir', path.join(__dirname, '/../../dist'));

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.use(function(req, res, next) {
  require('./server/app')(req, res, next);
});

app.use('/', express.static(app.get('distdir')));

// app.get('*', (req, res) => {
//   if (!path.extname(req.path)) {
//     res.redirect()

//     //res.sendFile('index.html', {root: app.get('distdir')});
//   }
//   else {
//     res.status(404).end();
//   }
// });

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch('.');

watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log("Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

const server = http.createServer(app);
server.listen(3000, 'localhost', function(err) {
  if (err) throw err;

  const addr = server.address();

  console.log('Listening at http://%s:%d', addr.address, addr.port);
});

// app.listen(app.get('port'), () => {
//   console.log('Node app running on port', app.get('port'));
// });