const browsersync = require('browser-sync');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const cp = require('child_process');

const bundler = webpack(webpackConfig);

let server;

let runBSync = () => {
  const bs = browsersync.create();
  bs.init({
    proxy: "localhost:3000",
    files: 'dist'
  });
  runBSync = () => {};
}

let runServer = () => {
  if (server) {
    server.kill('SIGTERM');
  }
  server = cp.spawn('node', ['src/server/app.js']);

  server.stdout.on('data', () => runBSync());

  server.stdout.on('data', x => process.stdout.write(x));
  server.stderr.on('data', x => process.stderr.write(x));
};
bundler.plugin('done', () => runServer());


bundler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    // ...
});

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});