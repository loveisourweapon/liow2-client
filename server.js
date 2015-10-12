var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');

var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');

var swig = require('swig');
var fs = require('fs');
var revManifestFile = 'public/assets/rev-manifest.json';
swig.setFilter('revManifest', (input) => {
  var revManifest = JSON.parse(fs.readFileSync(revManifestFile, 'utf8'));

  return revManifest[input] || input;
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  Router.run(routes, req.path, (Handler) => {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

var server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.info(`Express server listening on port ${app.get('port')}`);
});
